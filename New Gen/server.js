const express=require('express');
const app=express();
require('dotenv').config()
const dbconfig = require("./config/dbconfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const addmiRoute= require("./routes/adminRoute");
const employeeRoute = require("./routes/employeeRoute");

app.use('/api/user',userRoute);
app.use('/api/admin',addmiRoute);
app.use('/api/employee', employeeRoute);
const port=process.env.PORT || 5000;


console.log(process.env.MONGO_URL)
app.listen(port,()=> console.log(`Node server started at port ${port}`));