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
    User.find()
    .then((result) => {
        if(result.length > 0){
            var users = []
            result.forEach(function(user){
                var data = {
                    id: user._id,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    email: user.email,
                    is_active: user.isActive,
                    created_at: user._id.getTimestamp(),
                    access_link: {
                        uri: '/user/' + user._id,
                        method: ['GET', 'PATCH', 'DELETE'],
                        header: {
                            accept: 'application/json',
                            authorization: 'Bearer <token>'
                        }
                    }
                }
                users.push(data)
            })
            res.status(200).json({
                message: 'list all of user',
                result: users
            })
        }else{
            res.status(204).json({
                message: 'no content'
            })
        }
    })
    
}

const getUser = (req, res, next) => {
    User.findById(req.params.id)
    .then((detail) => {
        res.status(200).json({
            message: 'user detail',
            user: {
                id: detail._id,
                firstname: detail.firstName,
                lastname: detail.lastName,
                email: detail.email,
                is_active: detail.isActive
            }
        })
    })
    .catch((error) => {
        next(error)
    })
    
}

const updateUser = (req, res, next) => {
    var where = {
        _id: req.params.id
    }, update = {
        firstName: req.body.firstname,
        lastName: req.body.lastname
    }
    User.updateOne(where,update, (error, updated) => {
        if(error){
            next(error)
        }
        else{
            User.findById(where)
            .then((updated_user) => {
                res.status(200).json({
                    message: 'user updated',
                    user: {
                        id: updated_user._id,
                        firstname: updated_user.firstName,
                        lastname: updated_user.lastName,
                        email: updated_user.email,
                        is_active: updated_user.isActive
                    },
                    updated: updated
                })
            })
        }
    })
    
}

const inactivateUser = (req, res, next) => {
    var where = {
        _id: req.params.id
    }, update = {
        isActive: false,
    }
    User.updateOne(where,update, (error, inactivated) => {
        if(error){
            next(error)
        }
        else{
            User.findById(where)
            .then((inactivated_user) => {
                res.status(200).json({
                    message: 'user inactivated',
                    user: {
                        id: inactivated_user._id,
                        firstname: inactivated_user.firstName,
                        lastname: inactivated_user.lastName,
                        email: inactivated_user.email,
                        is_active: inactivated_user.isActive
                    },
                    inactivated: inactivated
                })
            })
            .catch((error) => {next(error)})
        }
    })
}

module.exports = {
    addUser,
    getAllUser,
    getUser,
    updateUser,
    inactivateUser
}