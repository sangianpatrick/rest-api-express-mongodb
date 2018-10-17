const User = require('../models/userModel')
require('dotenv').config()

const addUser = (req, res, next) => {
    const firstName = req.body.firstname
    const lastName = req.body.lastname
    const email = req.body.email

    if(!firstName){res.status(400).json({message: 'firstname is required'})}
    if(!lastName){res.status(400).json({message: 'last name is required'})}
    if(!email){res.status(400).json({message: 'email is required'})}

    if(firstName && lastName && email){
        const user = new User()
        user.firstName = req.body.firstname
        user.lastName = req.body.lastname
        user.email = req.body.email
        user.password = process.env.DEFAULT_USER_PASSWORD
        user.save()
        .then((new_user) => {
            res.status(201).json({
                message: 'a user has been succesfuly added',
                data: {
                    id: new_user._id,
                    firstname: new_user.firstName,
                    lastName: new_user.lastName,
                    email: new_user.email
                }
            })
        })
        .catch((error) => {
            next(error)
            // console.log(error)
        })
    }
    
}

const getAllUser = (req, res, next) => {
    res.status(200).json({
        message: 'list all of user'
    })
}

const getUser = (req, res, next) => {
    res.status(200).json({
        message: 'user detail'
    })
}

const updateUser = (req, res, next) => {
    res.status(200).json({
        message: 'user information has been succesfuly updated'
    })
}

const deleteUser = (req, res, next) => {
    res.status(200).json({
        message: 'user information has been succesfuly deleted'
    })
}

module.exports = {
    addUser,
    getAllUser,
    getUser,
    updateUser,
    deleteUser
}