const userModel = require('../models/user.model');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

//user authenticate hai ki nahi uske liye sbse phle middleware

module.exports.authUser = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlackListed = await userModel.findOne({ token: token});
    if(isBlackListed){
        return res.status(400).json({ message: 'Unauthorized'});
    }

    try{
        //decode krte time utna hi data milega jitna apne token create krte time diya hoga -- id here
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    }catch (err){
        return res.status(401).json({message: 'Unauthorized access'});
    }
}
//toh ye ek middleware hai ar check kar rha hai token mil rha hai ya nahi fir usko decode kr rha hai otherwise err