const {userModel} = require('../models/Users');


const userController = {
    getAll : (req,res) => {
        userModel.find({},function(err,doc){
            if(!err){
                res.json(doc)
            }else{
                res.status(500).json(err)
            }
        })
    }
}

module.exports = { userController }