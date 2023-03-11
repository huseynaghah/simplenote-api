const express = require('express')
const {userController} = require('../controllers/UserController')
const router = express.Router()


router.get('/',userController.getAll)
router.post('/get',userController.getCurrentUser)
router.post('/check',userController.checkByCode)
router.post('/signup',userController.signUp)
router.patch('/verify',userController.verify)
router.post('/signin',userController.signIn)



module.exports = router;