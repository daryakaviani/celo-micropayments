const mongoose = require('./../db.js');

const userSchema = new mongoose.Schema({
    ID: Number,
    name: String,
    sellerAddress: Number,
    buyerAddress: Number,
    price : Number,
    received : Boolean,
    mediatorAddress : Number,
    buyTime : Number,
    sellerAcceptTime : Number,
    challengeTime : Number,
    claimNonreceived : Boolean,
    sellerAcceptNonreceived : Boolean,
    challengeNonreceived : Boolean,
    challengeWinner : Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;

