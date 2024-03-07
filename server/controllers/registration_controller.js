const RegistrationModel = require('../models/registration_model')
const bcrypt = require('bcrypt')
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

module.exports.reset_password = async(req, res) => {
    const {username, password, newpassword} = req.body
    RegistrationModel.findOne({username:username})
    .then((resp) => {
        if(resp){
            bcrypt.compare(password, resp.password, (err, response) => {
                if (response) {
                    bcrypt.hash(newpassword, 10)
                        .then((hash) => {
                            RegistrationModel.updateOne({ password: hash })
                                .then((changed) => {
                                    return res.json("Password Changed Successfully")
                                }).catch((err) => console.log(err))
                        }).catch((err) => console.log(err))
                }
                else {
                    return res.json("Your current password is incorrect")
                }
            })
        }
        else{
            return res.json("Something happened! Try again later")
        }
        }).catch((err) => console.log(err))
}