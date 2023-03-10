const {userModel} = require('../models/Users');
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");
let privateKey = "ironmaidenironmaidenironmaidenironmaiden";


const transporter = nodemailer.createTransport({
    direct: true,
    host: "smtp.mail.ru",
    port: 465,
    auth: {
      user: "simple.note@mail.ru",
      pass: "sXBaswn2VvDqdDfFayzm",
    },
    secure: true,
  });

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

        let newConfCode =makecConfirmCode()

        let newUser = new userModel({
            email: req.body.email,
            confirmCode : newConfCode
        })

        newUser.save().then(function(doc,err){
            if(!err){
                res.status(200).json(doc)
              }else{
                res.status(501).json(err);
                console.log(err);
              }
        })

        var mailOptions = {
            from: "simple.note@mail.ru",
            to: req.body.email,
            subject: "Login Confirm Code",
            text: "Please, verify your account http://localhost:5173/signup/verify?code=" + newConfCode,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return console.log(error);
            }
          });
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
        userModel.findOneAndUpdate({confirmCode}, {password:req.body.password, isConfirmed:true}, {new:true}, function(err,doc){
            if(!err){
                res.json(doc)
            }else{
                res.status(501).json(err)
            }
        })
    },
    signIn : (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let stay = req.body.remember

        userModel.findOne({email: email, password: password, isConfirmed: true}, function(err, doc){
            if(!err){
                if(doc){
                    let token = jwt.sign({email: "a@a.com"}, privateKey , {
                        algorithm: "HS256",
                        expiresIn: stay ? "10d" : "1h",
                      });
                      res.json({userInf : doc, token : token})
                }else{
                res.status(404).json({msg : "not found"})
            }
            }else{
                res.status(500).json(err)
            }
        })
    }

    
}

module.exports = { userController }