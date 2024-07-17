// ./controllers/userController.js
const userService = require('../services/user.services');

exports.userLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const getUser = await userService.getUser(email, password);
        return res.status(200).json(getUser);
    } catch (error) {
        console.error(error);
        if (error.message === 'No record found') {
            return res.status(404).json({ error: error.message }); // Not found response with status 404
        } else if (error.message === 'Invalid credentials') {
            return res.status(401).json({ error: error.message }); // Unauthorized response with status 401
        } else {
            return res.status(500).json({ error: 'Internal Server Error' }); // Internal server error with status 500
        }
    }
};

exports.userRegister = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal2 Server Error' });
    }
};