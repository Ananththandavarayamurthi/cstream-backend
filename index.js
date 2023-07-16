
const express = require('express');
const app = express();
require("dotenv").config()
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB =require('./db/db')
const organizationRoutes = require('./Routes/organizationRoutes');
const employeeRoutes = require('./Routes/employersroutes');

// Configure middleware
app.use(bodyParser.json());
app.use(cors());
connectDB()

console.log("hi")
// Define routes
app.use('/api/organizations', organizationRoutes);
app.use('/api/employees', employeeRoutes);

// Start the server
const port = 4000;

app.get("/",(req,res)=>{
    res.send("welcome to this page")
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
