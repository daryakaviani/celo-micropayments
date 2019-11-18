const mongoose = require('./../db.js');

const userSchema = new mongoose.Schema({
    name: String,
    address: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;

