const { default: mongoose } = require("mongoose");

const { Schema } = mongoose

const noteSchema = new Schema(
    {
        content : {
            type: String,
        },
        creationDate : {
            type : Date,
            default : Date.now()
        },
        lastModified :{
            type : Date
        },
        markdown : {
            type : Boolean
        },
        isTrashed : {
            type: Boolean,
            default : false
        }
    }
)

const noteModel = mongoose.model('Note', noteSchema);

module.exports = { noteModel };