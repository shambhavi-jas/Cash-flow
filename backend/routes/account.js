const express=require('express');
const { account } = require('../db');
const { authMiddleware } = require('../middleware');
const mongoose=require('mongoose');
const app = express();

const router= express.Router();

router.get('/balance',authMiddleware,async (req,res)=>{
    const userId= req.userId;

    const userAccount=await account.findOne({userId:userId});
    res.status(200).json({
        "balance": userAccount.balance
    })       
}) 

router.post('/transfer',authMiddleware,async (req,res)=>{
    const to = req.body.to;
    const amount = req.body.amount;
    const from = req.userId;

    const session=await mongoose.startSession();
    session.startTransaction();

    //when transaction should fail
    const fromAcc= await account.findOne({userId:from}).session(session);
    const toAcc= await account.findOne({userId:to}).session(session);
    if(!fromAcc || !toAcc){
        await session.abortTransaction();
        return res.status(400).json({
            "msg":"Invalid Account"
        })
    }
    else if(amount<0){
        await session.abortTransaction();
        return res.status(400).json({
            "msg":"Enter a valid amount"
        })
    }
    else if(fromAcc.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            "msg":"Insufficient Balance"
        })
    }
    else{

        //Logic after doing relevant checks
        await account.updateOne({userId:from},{
            $inc:{balance : -amount}
        }).session(session);
    
        await account.updateOne({userId:to},{
            $inc:{balance: amount}
        }).session(session);

        await session.commitTransaction();

        return res.json({
            "msg" : "Transaction Successful"
        })

    }
    
})


module.exports={
    accountRouter: router
}
