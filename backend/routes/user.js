const express = require("express");

const router=express.Router();

const zod=require('zod');

const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const { login, signup } = require("../mongoose");
const { authMiddleware } = require("../middleware");
const { account } = require("../db");
const app= express();

app.use(express.json())


const userCreden=zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().email(),
    password: zod.string().min(6)
})

const loginCreden=zod.object({
    username: zod.string(),
    password: zod.string()
})

const updateCreden=zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.post('/signup',async (req,res)=>{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const username=req.body.username;
    const password=req.body.password;

    const response=userCreden.safeParse({firstName:firstName,lastName:lastName,username:username,password:password});
    if(response.success){

        const checkUser= await signup.findOne({username:username});
        if(checkUser){
           return  res.status(411).json({
                "msg": "User Already Exists"
            })
        }

        const user= await signup.create({
            username: username,
            password: password,
            firstName: firstName,
            lastName:lastName
        })
        
        
        const userId=user._id;

        await account.create({
            userId,
            balance: 1+Math.random()*1000
        })

        const token=jwt.sign({userId:user._id},JWT_SECRET);

        return res.status(200).json({
            "msg" : "User created successfully",
            "token" : token
        })
    }
    else{
        return res.status(411).json({
            "msg" : "Invalid inputs"
        })
    }
})

router.post('/signin',async (req,res)=>{
    const username= req.body.username;
    const password= req.body.password;

    const response=loginCreden.safeParse({username:username,password:password});
    if(response.success){
        const user= await signup.findOne({username:username,password:password});

        if(user){
            const token=jwt.sign({userId:user._id},JWT_SECRET);
            return res.json({
                "token":token,
                "name":user.firstName,
                "username":user.username
            }) 
        }

        else{ 
            return res.status(411).json({
                "msg": "No user exists! Please sign up"
            })
        }
        
    }
    else{
        res.status(411).json({
            "msg":"Invalid Input"
        })
        return;
    }  
})

router.put('/',authMiddleware,async (req,res)=>{   // This needs testing
    const new_password=req.body.password;
    const new_firstName=req.body.firstName;
    const new_lastName=req.body.lastName;

    const response= updateCreden.safeParse({password:new_password,firstName:new_firstName,lastName:new_lastName});
    if(response.success){

        await signup.UpdateOne({_id:req.userID},req.body);

        return res.json({
            "msg": "Updated successfully"
        })
    }
    else{
        return res.json({
        "msg":"Error while updating information"
        })
    }     
})

router.get('/bulk',async(req,res)=>{
    const filter=req.query.filter || "";
    const users=await signup.find({
        $or: [{
            firstName: {"$regex":filter,"$options":"i"}
        },{
            lastName: {"$regex":filter,"$options":"i"}
        }]
    })

    res.json({
        "user" : users.map((user)=>{
           return{ username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
           }
        })
    })
 }) 

module.exports={
    userRoute: router
}
