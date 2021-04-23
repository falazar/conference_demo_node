# Conference Service with Node.js using Express, Sequelize & MySQL demo.

Example of a simple Node.js full system for a Conference type application. 

Uses several technologies in the stack including

Node.js - base javascript server environment.

Express - 

Sequelize - Database interface helper

MySQL - Database

EJS - Templating system.


##Problem Statement: 

Design a RESTful API for talks at a conference and attendees. 

More information and sample data can be found below: https://github.com/yuntaechriskim/riiid-labs_back-end_assessment/tree/master/Assessment


Create API routes to:

    add a talk
    add an attendee
    add an attendee to the list for a talk
    remove an attendee from a talk
    (Optional) Execute and describe testing process
    -- Was not attempted for this type demo.
    
    (Optional) Document and list endpoints with brief explanations


##Solution
The Node server is created to allow CRUD inputs and a rudimentary front end system to match project requirements. 

###API Endpoints (Testable with Postman)
  post http://localhost:8081/api/talks

  Create a new talk
  
  post http://localhost:8081/api/talks

  Retrieve all talks (currently a web page, would need to split back out)

  get http://localhost:8081/api/talks

  Retrieve a single talk by id  (webpage split up)

  get http://localhost:8081/api/talks/:id

  Update a talk by id

  put http://localhost:8081/api/talks/:id

  Delete a talk by id

  delete http://localhost:8081/api/talks/:id

  Delete all talks

  delete http://localhost:8081/api/talks

Similar methods for users, and talkAttendees (only some listed here)

  Create a new user

  post http://localhost:8081/api/users

  Add a attendee(user) to a talk.

  post http://localhost:8081/api/talkAttendees

  Remove an attendee(user) to a talk.

  delete http://localhost:8081/api/talkAttendees/:id

  
###Web Endpoints
  http://localhost:8081/api/talks
  
  http://localhost:8081/api/talks/:id
  

A simple web front end demo was created using the EJS templating system for two pages. 
The talks page has a simple list of all known talks, 
and can perform a basic search using 
  http://localhost:8081/api/talks?q=node
  
Summaries can be toggled on and off via a simple js method.   

Currently the list is HARD CODED for user 11, and will show if this user is 
attending this talk or not.

The secondary talk pages have an option to Attend/Remove 
the current user from this talk. 
It will update the db live without a page reload, and change buttons as needed. 
This is also hardcoded for user id 11 as there is no authentication for this example. 

A capacity field was added to the talk object, and a stub method created in the 
controller, to allow the concept of a "full talk" to not not allow another user in. 
Time did not allow its next implementation. 

###To Run Server:  node server.js

If the database tables are not created, they will recreate at runtime, 
though they will be empty of any sample data. 
And the user id 11 would need to be created. 



James Ratcliff
Fri April 23, 2021. 


