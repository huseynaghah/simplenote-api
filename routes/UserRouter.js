const express = require('express')
const {userController} = require('../controllers/UserController')
const router = express.Router()


const userRouter = router.get('/',userController.getAll)


module.exports = {userRouter};