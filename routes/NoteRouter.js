const express = require('express')
const {noteController} = require('../controllers/NoteController')
const router = express.Router()


router.get('/',noteController.getAll)
router.post('/',noteController.addNote)


module.exports = router;