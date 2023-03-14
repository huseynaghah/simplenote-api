const express = require('express')
const {noteController} = require('../controllers/NoteController')
const router = express.Router()


router.get('/',noteController.getAll)
router.get('/:id',noteController.getByUser)
router.post('/',noteController.addNote)
router.patch('/edit', noteController.editNote)
router.patch('/pin',noteController.pinNote)
router.post('/delete',noteController.trashNote)

module.exports = router;