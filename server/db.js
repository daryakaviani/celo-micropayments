var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/celo', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://celo:celoproject@blockchainatberkeley-tosn8.azure.mongodb.net/celo?retryWrites=true&w=majority', { useNewUrlParser: true })

module.exports = mongoose;
