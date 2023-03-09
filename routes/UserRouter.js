const express = require('express')
const {userController} = require('../controllers/UserController')
const router = express.Router()


router.get('/',userController.getAll)
router.post('/check',userController.checkByCode)
router.post('/signup',userController.signUp)



module.exports = router;