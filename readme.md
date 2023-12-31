# An Employee Management System (Backend)

Clone this repository or download the project directly.

In the project directory, you can run:

### `npm install` 
or 
### `npm i`

It can automatically install all dependencies from package.json file

### IMPORTANT
Before start the server, make sure to check .env file that I have attached with the code.
In .env replace the MONGODB_ATLAS_CONNECTION_STRING with your mongoDB string.

and keep the port 3001/3002 available for the server.

To start the ExpressJs Server, run:

### `npm start`

Runs the app in the development mode.\
Check your terminal to see running status.

## Libraries used in this project

### expressjs, nodemon, bycrypt, body-parser, jsonwebtoken, mongoose (mongoDB driver and ODM), dotenv, and core.

## Usages
### Configuration:

This app only APIs so that you can make requests from your frontend project or postman.

### Functionality:
There are login and signup functionality available for employees and only login available for managers ( Signup not for managers because a manager can create/assign a manager ).

There are 4 sections for users
#### 1. See their profile (For both employee and managers)
#### 2. Create, Update, Delete, See All Employees (Only for managers)
#### 3. Filter employees in ascending and descending order according to their name and location (Only for managers)
#### 4. Create, Update, Delete, See All Manager (Only for managers)
#### 5. Create, Update, Delete, See All Department (Only for managers)
#
# Happy New Year All of You.
###### created by Jatin Gautam.