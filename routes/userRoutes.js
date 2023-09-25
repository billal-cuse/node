const express = require('express')
const { getUser, postUser } = require('../controllers/userController')
const avaterUpload = require('../middlewares/avatarUpload')
const router = express.Router()

router.route('/').get(getUser).post(avaterUpload,postUser)

module.exports = router