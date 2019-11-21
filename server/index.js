const User = require('./models/Users.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());

app.get('/', (req, res) => {
    res.send('Use the React frontend for interacting with the API!');
});

app.get('/user/:address', async (req, res) => {
    // stores in req.params.address
    res.header("Access-Control-Allow-Origin", "*");
    var p = await User.findOne({ address: req.params.address });
    if (p == null) {
        res.send("null");
    } else {
        res.send(p.name);
    }
});

app.use('/user', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

app.post('/user', async (req, res) => {
    // req.body.address stores the address
    // req.body.name stores the name
    var user = await User.create(req.body);
    res.send(req.body.name);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Celo Micropayments Project server listening on port ${port}!`);
});
