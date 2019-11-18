const User = require('../models/Users.js');

const test1 = new User({
    name: 'ExampleName',
    address: "0xab"

}).save();


