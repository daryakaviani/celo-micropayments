var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/celo', { useNewUrlParser: true });

module.exports = mongoose;