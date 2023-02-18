const express = require('express');

const router = express.Router();

// ---
router.get('/', (req, res) => {
    res.json({ mssg: 'Hello from payment' });
});

// POST new payment
router.post('/', (req, res) => {
    // res.json({ mssg: 'POSTING payment' })
    fetch('https://online.yoco.com/v1/charges/',
    {
        method: "post",
        headers: {
            'X-Auth-Secret-Key': process.env.REACT_APP_YOKO_SK
        },
        body: req.body
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error.response.data);
        })
});

module.exports = router;