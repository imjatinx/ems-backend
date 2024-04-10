// constants
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3001 || process.env.PORT
const mongoose = require('mongoose');
// Routes
const authRoutes = require('./Routes/AuthRoutes');
const deptRoutes = require('./Routes/DeptRoutes');
const Department = require('./Models/departmentModel');
const { verifyJWT } = require('./Middlewares/JwtMiddleware');
const userRoutes = require('./Routes/UserRoutes');
const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://ems.techmedia.one'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
 }));

app.use(bodyParser.json());

// Configure MongoDB connection to atlas.
mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING)
.then(()=>{
    console.log('Yay!! Database Connected Successful');
    Department.createDefaultDepartment()
    app.listen(port, ()=>console.log(`Listening at 127.0.0.1:${port}`));
}).catch(error=>console.log('Something went wrong in Database connection: ',error));


app.get('/', (req,res)=>{
    return res.status(200).json({message : 'Welcome to the system!'})
});

app.use('/auth', authRoutes);
app.use('/dept', verifyJWT, deptRoutes);
app.use('/user', verifyJWT, userRoutes);

