var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/celo');

module.exports = mongoose;