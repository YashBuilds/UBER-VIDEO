const userModel = require('../models/user.model');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

//user authenticate hai ki nahi uske liye sbse phle middleware

module.exports.authUser = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlackListed = await blackListTokenModel.findOne({ token: token});
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

module.exports.authCaptain = async(req,res,next) =>{
    const token = req.cookies.token|| req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.staus(401).json({message : 'Unathorized'});
    }

    const isBlackListed = await blackListTokenModel.findOne({token: token});

    if(isBlackListed){
        return res.status(401).json({ message: 'Unauthorized '});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;
        
        return next()
    }catch(err){
        res.status(401).json({message: 'Unauthorized' });
    }
}
//toh ye ek middleware hai ar check kar rha hai token mil rha hai ya nahi fir usko decode kr rha hai otherwise err