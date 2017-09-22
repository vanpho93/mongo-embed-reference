const mongoose = require('mongoose');
const CarSchema = require('./Car');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    age: Number,
    cars: [CarSchema],    // embed
    posts: [{             // reference
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
