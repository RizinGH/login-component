const RegistrationModel = require('../models/registration')
const bcrypt = require('bcrypt')
const { response } = require('express')
const jwt = require('jsonwebtoken')

module.exports.register = async(req, res) => {
    const { username, address, gender, password } = req.body

    RegistrationModel.findOne({username})
    .then((response) => {
        if(response){
            res.json("username already taken")
        }
        else{
            bcrypt.hash(password, 10)
            .then((hash) => {
                RegistrationModel.create({ username:username, address:address, gender:gender, password:hash})
                .then((user) => {
                    console.log("Registration Successfull...");
                    res.send(user)  
                }).catch((err) => console.log(err))
            })
        }
    }).catch((err) => console.log(err))
}

module.exports.login = async(req, res) => {
    const { username, password } = req.body
    RegistrationModel.findOne({username:username})
    .then((user) => {
        if(user){
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({username:user.username},
                        "jwt-secret-key", {expiresIn:'1d'})
                        return res.json({Status:'success','username':username ,'token':token})
                }
                else{
                    return res.json("Incorrect Password")
                }
            })
        }
        else{
            return res.json("User not found")
        }
    })
}