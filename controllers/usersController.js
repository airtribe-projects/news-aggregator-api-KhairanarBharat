const usersModule = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const user = req.body;
        user.password = bcrypt.hashSync(user.password, 5);
        await usersModule.create(user);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }    
}

const loginUser = async (req, res) => {
    const userByEmail = {email : req.body.email};
    const dbUser = await usersModule.findOne(userByEmail).lean().exec();
    if(!dbUser) {
        return res.status(401).send();
    }
    if (dbUser && bcrypt.compareSync(req.body.password, dbUser.password)) {
        const token = jwt.sign({username: dbUser.email, preferences: dbUser.preferences}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).send({ token });
    } else {
        res.status(401).send();
    }
};

const updatePreferences = async (req, res) => {
    try {
        const userEmail = req.user.username;
        const { preferences: newPreferences } = req.body;

        if (typeof newPreferences === "undefined") {
            getPreferences(req, res);
        }
        const updatedUser = await usersModule.findOneAndUpdate(
            { email: userEmail },
            { $set: { preferences: newPreferences } },
            { new: true } 
        ).lean().exec();
        if (!updatedUser) {
            return res.status(404).send();
        }
        return res.status(200).send({ preferences: updatedUser.preferences });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
};

const getPreferences =  (req, res) => {
     res.status(200).send({ preferences: req.user.preferences });
}

module.exports = {
    registerUser,
    loginUser,
    getPreferences,
    updatePreferences
};