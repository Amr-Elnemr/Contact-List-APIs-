var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var mongoose = require("mongoose");
var Contacts =  mongoose.model("contacts");

var callBacks = require("../Models/contacts")

/* ******** Authentication Middleware ********* */
router.use(bodyParser.json(),function(request, response, next){
	console.log("I'm in");
	Contacts.find(
		{$and:	[
	          		{authorization : request.body.authorization},
					{deviceToken : request.body.deviceToken},
					{fingerprint : request.body.fingerprint},
	      		]
 		},
 		function(error,result){
			if(result[0] !== undefined){
				request.authId = result[0]._id;
				next();
			}
			else{
				response.send("Authentication Error");	
			}
  	});
	
});

/* ******** Data validation Middleware ********* */
router.use("/addContact", bodyParser.json(),function(request, response, next){
	let msg = "";
	if(typeof request.body.firstName !== 'string'){
		msg = msg + "Invalid First name";
	}
	if(typeof request.body.lastName !== 'string'){
		msg = msg + "\nInvalid Last name";
	}
	if (/^(01)[0-9]{9}$/.test(request.body.mobileNumber) === false) {
		msg = msg + "\nInvalid mobile number";
	} 
	if (/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4})(\]?)$/.test(request.body.email) === false) {
		msg = msg + "\nInvalid e-mail";
	} 

	if(msg !== ""){
		response.send(msg);
	}
	else{
		next();
	}
	
});



router.post("/getList",bodyParser.json(), callBacks.getList);

router.post("/addContact",bodyParser.json(), callBacks.addContact);

router.post("/getRecentlist", callBacks.getRecentlist);

module.exports = router;
