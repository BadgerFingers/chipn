const express = require('express');
require('dotenv').config();
const axios = require('axios')

const router = express.Router();
const SECRET_KEY = process.env.YOKO_SK;

// ---
router.get('/', (req, res) => {
    res.json({ mssg: 'Hello from payment' });
});

// POST new payment
router.post('/', (req, res) => {
    // res.json({ mssg: 'POSTING payment' })
    
    res.status(200).send({
        body: req.body,
    })

    if(res.status(200)){
        axios.post(
            'https://online.yoco.com/v1/charges/',
            req.body,
            {
            headers: {
                'X-Auth-Secret-Key': SECRET_KEY,
            },
            },
        )
        .then(res => {
            // res.status will contain the HTTP status code
            // res.data will contain the response body
            res.send({data: res.data})
        })
        .catch(error => {
            // handle errors
        })
    }
    }
    
    );

module.exports = router;