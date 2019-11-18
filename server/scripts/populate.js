const User = require('../models/Users.js');

const test1 = new User({
    ID: 123,
    name: 'Alice',
    sellerAddress : 1234,
    buyerAddress : 5678,

}).save();


