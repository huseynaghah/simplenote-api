const {noteModel} = require('../models/Notes');

const noteController = {
  getAll : (req,res) =>{
    noteModel.find({}).populate('userId').exec(function(err,doc){
      if (!err){
        res.json(doc)
      }else{
        res.status(500).json(err)
      }
    })
  },
  addNote : (req, res )=>{
    let newNote = new noteModel({
      content: req.body.content,
      lastModified : Date.now(),
      userId : req.body.userId
    })

    newNote.save().then(function(err,doc){
      if(!err){
        res.json(doc)
      }else{
        res.status(500).json(err)
      }
    })
  },
  trashNote: (req,res) =>{
    noteModel.findOneAndUpdate
  }
}

module.exports = { noteController }