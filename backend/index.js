const express = require("express");
const app=express()

app.use(express.json());

const cors=require('cors')
app.use(cors());


const jwt=require("jsonwebtoken");
const JWT_TOKEN=require("./config");


const {userRoute} = require('./routes/user');
const { accountRouter } = require("./routes/account");
app.use('/api/v1/user',userRoute);
app.use('/api/v1/account',accountRouter);

app.listen(3000);
