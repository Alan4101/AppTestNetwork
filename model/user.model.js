const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends:{
        incomeRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        outcomeRequests:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    freeUsers: [{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    icon: {
        type: String,
        required: true
    },

},{
    versionKey: false
});


const User = mongoose.model('Users', UserModelSchema);
module.exports = User;