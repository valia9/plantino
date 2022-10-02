const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: [true, 'Please, add your email'],
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    plants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
    }
},
{ timestamps: true }
)

UserSchema.plugin(passportLocalMongoose)

module.exports = User = mongoose.model('User', UserSchema);