const ProfileModel = require('../models/profile_model')
require('dotenv').config()
const axios = require('axios')

const SITE_SECRET = process.env.SITE_SECRET

module.exports.profile = async (req, res) => {
    const { captchaValue, username, name, email, password, dob, age, gender, address, color } = req.body
    const { data } = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`,
    )
    if (data.success) {
        ProfileModel.findOne({ username: username })
            .then((user) => {
                if (user) {
                    return res.json("User details already present")
                }
                else {
                    const filedata = req.file.filename
                    ProfileModel.create({ username: username, name: name, email: email, password: password, dob: dob, age: age, gender: gender, address: address, color: color, file: filedata })
                        .then((response) => {
                            return res.json("Successfully completed")
                        }).catch((err) => console.log(err))
                }
            })

    }
    else {
        return res.send("Error Validating reCAPTCHA")
    }
}

module.exports.formcompleted = (req, res) => {
    const { username } = req.body
    ProfileModel.findOne({ username: username })
        .then((data) => {
            if (data) {
                return res.json("Profile Completed")
            }
            else {
                return res.json("Profile Incomplete")
            }
        }).catch((err) => console.log(err))
}

module.exports.getimage = (req, res) => {
    const { username } = req.body
    ProfileModel.findOne({username: username})
    .then((response) =>{
        return res.send(response.file)
    }).catch(err => err)
}