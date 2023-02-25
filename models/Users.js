const { default: mongoose } = require("mongoose");

const { Schema } = mongoose

const userSchema = new Schema({
    email : {
        type :String,
        required : true},
    password : {
        type :String,
        required : true},
    confirmCode : {
        type :String,
        required : true},
    createDate : {
        type : Date,
        default : Date.now()
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };