const mongoose=require("mongoose");
const { CONNECTION_URL } = require("./config");

mongoose.connect(CONNECTION_URL)
const signupSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String
})

const signup = mongoose.model('signup',signupSchema);

module.exports={
    signup : signup
}