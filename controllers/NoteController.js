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
  getByUser : (req, res) => {
    noteModel.find({userId: req.params.id}, function (err,doc) {
      if(!err){
        res.send(doc)
      }else{
        res.status(500).json(err)
      }
    })
  },
  addNote : (req, res )=>{
    let newNote = new noteModel({
      content: "",
      lastModified : Date.now(),
      creationDate: Date.now(),
      isTrashed: false,
      tags:[],
      markdown: false,
      isPinned:false,
      userId : req.body.userId
    })

    newNote.save().then(function(doc,err){
      if(!err){
        res.json(doc)
      }else{
        res.status(500).json(err)
      }
    })
  },
  trashNote: (req,res) =>{
    let noteId = req.body._id
    noteModel.findByIdAndDelete({_id: noteId}, {new:true}  ,function(err,doc){
      if(!err){
        res.send(doc)
      }else{
        res.status(501).send(err);
        console.log(err);
      }})
  },
  editNote: (req,res) => {
    let noteId = req.body._id
    noteModel.findByIdAndUpdate({_id : noteId}, {content: req.body.content, lastModified: req.body.lastModified}, {new: true}, function (err,doc) {
      if(!err){
        res.send(doc)
      }else{
        res.status(501).send(err);
        console.log(err);
      }
    })
  }
  ,
  pinNote: (req,res) => {
    let noteId = req.body._id
    noteModel.findByIdAndUpdate({_id : noteId}, {isPinned: req.body.isPinned}, {new: true}, function (err,doc) {
      if(!err){
        res.send(doc)
      }else{
        res.status(501).send(err);
        console.log(err);
      }
    })
  }
}

module.exports = { noteController }