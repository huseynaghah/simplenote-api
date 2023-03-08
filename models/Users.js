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
    },
    notes : {type : [Schema.Types.ObjectId], ref : "Note"}
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };