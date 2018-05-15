# Contact_List_APIs

# My Cart

A Contact List ​APIs' implemented using Node.js (Express.js)

## Prerequisites (Used Technologies)

* Node.js
* Express
* MongoDB 


## Installing

After cloning, inside the project directory run the following:
```
		mongorestore --db MyContacts MyContacts_dump
		npm install; mongod; npm start
```


## Running (Example)

### Add new contact to User B:
```sh
		Method: POST
		Request URL: http://localhost:9999/contacts/addContact 
		Request body (example) - JSON(application/json):
			 {
			 	"authorization" : "ff34555392bcd3f268f74d29daf1f819336666b742938c7e348516a568357a4648cb55f688520",
				"deviceToken" : "5ce5c04fea6f000cfc29f9682f4a93f3aleed7019f7f5ae6bldf43863bd8bfa461106d4af442fa715297ef4daf769409882af4442365662a93abb93bcccc747c7014c4",
				"fingerprint" : "987654321",
			    "firstName": "f_name",
			    "lastName": "l_name",
			    "mobileNumber": "01011111111",
			    "email": "contact@mail.com"
			 	
			 }
```

### Get all User_B contacts:
```sh
		Method: POST
		Request URL: http://localhost:9999/contacts/getList 
		Request body (example) - JSON(application/json):
			 {
			    "pageNum": "1", 	#optional, default=1
			    "character": "a", 	#optional
			    "authorization" : "ff34555392bcd3f268f74d29daf1f819336666b742938c7e348516a568357a4648cb55f688520",
				"deviceToken" : "5ce5c04fea6f000cfc29f9682f4a93f3aleed7019f7f5ae6bldf43863bd8bfa461106d4af442fa715297ef4daf769409882af4442365662a93abb93bcccc747c7014c4",
				"fingerprint" : "987654321"
			 }
```

### Get User_B last 5 contacts added:
```sh
		Method: POST
		Request URL: http://localhost:9999/contacts/getRecentlist 
		Request body (example) - JSON(application/json):
			{
				"authorization" : "ff34555392bcd3f268f74d29daf1f819336666b742938c7e348516a568357a4648cb55f688520",
				"deviceToken" : "5ce5c04fea6f000cfc29f9682f4a93f3aleed7019f7f5ae6bldf43863bd8bfa461106d4af442fa715297ef4daf769409882af4442365662a93abb93bcccc747c7014c4",
				"fingerprint" : "987654321"
			}
```
 
