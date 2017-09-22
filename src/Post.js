const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: String
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
