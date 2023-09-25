const express = require('express')
const avaterUpload = require('./middlewares/avatarUpload')
const bodyParser = require('body-parser')
const {userValidators, userValidationHandler} = require('./middlewares/userValidator')
const User = require('./models/userModel')
const connectMongo = require('./config/db')
const { check, validationResult } = require('express-validator')
require('dotenv').config()
const app = express()

connectMongo(process.env.mongoLink)
app.config = {
    host: '192.168.0.1',
    port: 8080
}

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))


app.set('view engine','ejs')

app.post('/',avaterUpload,userValidators,userValidationHandler,async (req,res)=>{
    const errors = validationResult(req)
    const mappedErrors= errors.mapped()
    if(Object.keys(mappedErrors).length===0){
        next();
    }else{
    }
    res.send('success')
})


app.listen(app.config.port, app.config.host, () => {
    console.log(`server running on http://${app.config.host}:${app.config.port}`)
})

 
