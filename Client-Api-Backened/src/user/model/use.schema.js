// this schema is for defining mongo database.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    // ObjectId,
    username: {
        type: String,
        maxlength: 40,
        required: true
    },
    fullname: {
        type: String,
        maxlength: 40,
        required: true
    },
    email: {
        type: String,
        maxlength: 40,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min:8,
        maxlength: 200,
        required: true
    },
    refreshJWT: {
        token: {
            type: String,
            maxlength: 500,
            default:''
        },
        addedAt: {
            type: Date,
            required: true,
            default:Date.now()
        }
    }

});
// exporting by making databse model table and passing the schema as second argument;
module.exports = {
    UserSchema:mongoose.model('User',UserSchema)
}