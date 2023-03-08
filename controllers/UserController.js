const {userModel} = require('../models/Users');


const userController = {
    getAll : (req,res) => {
        userModel.find({}).populate("notes").exec(function(err,doc){
            if(!err){
                res.json(doc)
            }else{
                res.status(500).json(err)
            }
        })
    },
    signUp : (req, res) => {
        
    }

    
}

module.exports = { userController }