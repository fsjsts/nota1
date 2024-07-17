// ./services/userService.js
// const UserModel = require('../models/User');
const path = require('path');
console.log('========Current directory:', __dirname);
console.log('========Resolved path:', path.join(__dirname, '../models/User'));
const UserModel = require(path.resolve(__dirname, '../models/User'));

exports.createUser = async userData => {
    console.log('-----------------1----------------------')
    console.log(userData)
    try{
        const newUser = await UserModel.create(userData);
        return newUser;
    } catch (error){
        throw new Error('error in creating user')
    }
}

exports.getUser = async (email, password) => {
    console.log('---------------2------------------------')
    console.log(email)
    try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return { status: 'Not found' }; // Return a code indicating user not found
        }

        const isMatch = await user.comparePassword(password); // Assuming a comparePassword method exists on the user model

        if (isMatch) {
            return { status: "Success", userId: user._id }; // Return the data
        } else {
            throw new Error('Invalid credentials'); // Throw an error for invalid credentials
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        throw new Error('Internal server error getUser'); // Throw a generic error for the controller to handle
    }
};
