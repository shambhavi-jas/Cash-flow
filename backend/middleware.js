const jwt=require('jsonwebtoken');
const { JWT_SECRET } = require('./config');


const authMiddleware= (req,res,next)=>{
    const token=req.headers.authorization;

    try{
        const response=jwt.verify(token,JWT_SECRET);
        req.userId=response.userId;
        next();
    }catch(err){
        res.sendStatus(403);
    }

}

module.exports= {authMiddleware};

