const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Use the React frontend for interacting with the API!');
});

app.post('/transact', (req, res) => {
    // Process the transaction
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Celo Micropayments Project server listening on port ${port}!`);
});
