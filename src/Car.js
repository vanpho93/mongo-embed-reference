const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    branch: String,
    color: String
});

// const Car = mongoose.model('car', CarSchema);
module.exports = CarSchema;
