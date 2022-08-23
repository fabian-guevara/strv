# Address Book

RESTful API created to maintain data related to an address book. Two diferent storage services are used
- MongoDB with Mongoose on top of it.
- Firebase 

The API was developed using NodeJS, Express and JavaScript as the main tools.
This project runs on Node version **16.13.2**.

## Installation
	npm install 

## Dev mode 
	npm run dev

## Features Overview
- Adding a user
- Log into a created account
- Save a contact to Firebase

	
	### POST  
	 #### users/signup
		"headers" : {  Content-Type: "application/json" }
		"body" : { email: valid@email.com, password: abc123 }
	User will be logged in after successfull signup
	#### users/login
		"headers" : {  Content-Type: "application/json" }
		"body" : { email: valid@email.com, password: abc123 }
	A valid web token will be returned.

	#### users/add-contact
		"headers" : {  Content-Type: "application/json", Authorization: Bearer HERE_GOES_YOUR_TOKEN }
				"body" : {

		                  "firstName": "Fabian",
					
							"lastName": "Guevara",

							"phone": "606390209",

							"address": "Somewhere over the rainbow"

				}
  


Also Examples can be found in the api.rest file provided.

