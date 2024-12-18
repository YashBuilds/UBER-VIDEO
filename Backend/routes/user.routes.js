const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

//yha pr jo express validator hai na woh sirf check kr rha hai ar woh cheez galat hoti hai ar uske upr apko kuch b action perform karna hai toh perform krte ho controller ke ander
router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 character long')
],
    userController.registerUser
)


//login route created for user

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 character long')
],
    userController.loginUser
)

//profile route
router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

//logout

router.get('/logout',authMiddleware.authUser,userController.logoutUser)






module.exports = router;