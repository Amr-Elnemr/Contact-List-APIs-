var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var mongoose_paginate= require("mongoose-paginate");

/******** Building Schema*******/
var contacts = new Schema({
	_id:Schema.Types.ObjectId,
	authorization:{ type: String },
	deviceToken:{ type: String },
	fingerprint:{ type: String },
	uname: {type: String }, 
	contacts: []
});


contacts.plugin(mongoose_paginate);

var Contacts =  mongoose.model("contacts", contacts); // ** Registering ** 


/*------------------ Callbacks ----------------------*/

/*********** Get All user Contacts (5 /page) ********************/
exports.getList = function(request,response){
	const pageNum = request.body.pageNum ? request.body.pageNum:1;
	const character = request.body.character ? request.body.character: false;
	Contacts.find({_id: request.authId},function(error,result){
		if(result[0].contacts.length === 0){
			response.send("No contacts found");
		}
		else{
			let output = result[0].contacts;
			if(character){
				output = output.filter(c => c.firstName[0].toLowerCase() === character.toLowerCase());
			}	
    		response.json(output.slice(5*(pageNum-1), 5*(pageNum-1)+5));
		}
		
  	});
};

/************** Add New Contact ***************/
exports.addContact = function(request, response){
	const new_contact = {
		createdAt: Date.now(),
		firstName:request.body.firstName,
		lastName:request.body.lastName,
		mobileNumber:request.body.mobileNumber,
		email: request.body.email
	};

  	Contacts.update(
  		{'_id': request.authId},
  		{ $push: { contacts: new_contact } },
  		function(error){
			if(error){
				response.send(error);
			}
			response.send("Contact Added");
		})
};

/************** Get last five Contacts created ***************/
exports.getRecentlist = function(request, response){
	Contacts.find({_id: request.authId}, function(error,result){
		if(result[0].contacts.length === 0){
			response.send("No contacts found");
		}
		else{
	    	response.json(result[0].contacts.slice(-5));
		}
  	});
};
