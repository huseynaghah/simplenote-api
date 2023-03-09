const {userModel} = require('../models/Users');


const userController = {
    getAll : (req,res) => {
        userModel.find({}).populate("notes").exec(function(err,doc){
            if(!err){
                res.status(200).json(doc)
            }else{
                res.status(501).json(err)
            }
        })
    },
    signUp : (req, res) => {

        function makecConfirmCode() {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter <  10) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }

        let newUser = new userModel({
            email: req.body.email,
            confirmCode : makecConfirmCode()
        })

        newUser.save().then(function(doc,err){
            if(!err){
                res.status(200).json(doc)
              }else{
                res.status(501).json(err);
                console.log(err);
              }
        })
    },
    checkByCode : (req,res) => {

        let confirmCode = req.body.confirmCode;
        userModel.findOne({confirmCode: confirmCode, isConfirmed: false}, function (err,doc) {
            if(!err){
                res.json(doc)
            }else{
                res.status(501).json(err)
            }
        })
    },
    verify : (req,res) => {
        let confirmCode= req.body.confirmCode;
        userModel.findOneAndUpdate()
    }

    
}

module.exports = { userController }