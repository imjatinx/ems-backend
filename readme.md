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

## Techniques used in this project

#### 1. User signed up with their credentials, they will default added to a department name 'Newcomer' and their role will be employee by default.
#### 2. then they can login and see their profile information.
#### 3. if the login user's role is employee, they will see only 1 tab for profile information.
#### 4. if the login user's role is manager, they will see only 3 more tab other than profile such as Employees, Managers, Departments.
#### 5. A user with role manager is created at the time of project building from directly database.
#### 6. then managers can operate employees, other managers and departments
#### 7. but the current loggedin (self) manager can not delete and update their associated department and role.
#### 8. if the employee role user wants to reach out to the manager routes from url bar then the system will automatically logged out and end the session.


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