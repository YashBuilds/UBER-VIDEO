//user ko mujhe create karna hai ar isme invlove ho rha hai apna mongodb-  server se toh direct nhi hai woh uska kahi alag db hoga , uske liye na ek service create kar rha hu jo db se interact kregi

const { hash } = require('bcrypt');
const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const { validationResult }= require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async(req,res,next) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname,email,password} = req.body;
    
    const isUserAlready = await userModel.findOne({email});

    if(isUserAlready){
        return res.status(400).json({message: 'User already exist'});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});
}

module.exports.loginUser = async(req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message : 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token, user});
}

//jo ek profile page hota hai woh ek particular user ko dikta h toh usse cheez ko perform krne ke liye hme ek middleware lagna padta hai hamre isse route pe,check karo konsa user logged in hai usse particular user ka data ham profile page pe dikha dege , if no user login send simple error unauthorised access

module.exports.getUserProfile = async(req,res,next) => {

    res.status(200).json(req.user);
    //jo b req.user hmne middleware mai set kiya hoga wahi as a response chla jayega apke profile pe
}


//ham routes create krne wale h lkin unkka jo logic hoga woh controllers mai likhege

//jwt ke sath logout route create karna thoda tricky hota hai hame datbase ki help leni padti hai, ham ek blacklist token ka ek collection kind of create krne wale hai jha pe jo b logout kr dege unke token ko blacklist kr dege ar fir check kr lege ky ye particular token yha pe exist karta hai ya nahi


module.exports.logoutUser = async(req,res,next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blackListTokenModel.create({token});

    res.status(200).json({ message: 'Logged Out'});
}