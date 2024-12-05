const userModel = require('../models/user.model');


//isse particular function ka ek kam hai user ko create karna ar check karna ye saare data mil rahe hai ki nahi
module.exports.createUser = async({
    firstname,lastname,email,password
}) =>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}
