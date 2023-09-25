const {check, validationResult} = require("express-validator")
const User = require("../models/userModel")
const fs = require('fs')
const path = require('path')

const userValidators = [
    check('name')
        .isLength({min: 1})
        .withMessage("name is required")
        .isAlpha("en-US", {ignore: " -"})
        .withMessage('name must not contain other then alphabet')
        .trim(),
    check('roll')
        .isLength({min: 6})
        .withMessage("roll must be six digit")
        .isNumeric()
        .withMessage('roll must be number'),
    check('phone')
        .isLength({min: 11})
        .withMessage("11 digit number is required")
        .isNumeric()
        .withMessage('phone number must be requried')
        .custom(async (phone)=>{
            try {
                const user = await User.findOne({phone})
                if(user){
                    throw new Error('this phone number already exists')
                }
            } catch (error) {
                throw new Error(error)
            }
        }),
    check('email')
        .isEmail()
        .withMessage("invalid email address")
        .trim()
        .custom(async (email) => {
            try {
                const user = await User.findOne({email})
                if (user) {
                    throw new Error('this email already exits')
                }
            } catch (error) {
                throw new Error(error)
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage('password must be strong')
]

const userValidationHandler =async (req,res,next)=>{
    const errors = validationResult(req)
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length===0){
        next()
    }else{
        if(req.files.length>0){
            const { filename } = req.files[0];
            setTimeout(() => {
                fs.unlink(
                    path.join(__dirname,`/../public/uploads/avatars/${filename}`),(err)=>{
                        if(err) console.log(err)
                    }
                ) 
                res.send('something wrong')
            }, 2000);
        }
    }
}

module.exports = {userValidators,userValidationHandler}