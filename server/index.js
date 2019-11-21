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
    var p = await User.findOne({ address: req.params.address });
    if (p == null) {
        res.send("null");
    } else {
        res.send(p.name);
    }
});

app.post('/user', async (req, res) => {
    // req.body.address stores the address
    // req.body.name stores the name
    var user = await User.update(
        { address: req.body.address },
        req.body,
        { upsert: true }
    );
    res.send(req.body.name);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Celo Micropayments Project server listening on port ${port}!`);
});
