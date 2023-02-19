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
    //
        // fetch(
        //     "https://online.yoco.com/v1/charges/",{
        //       headers: {
        //           'X-Auth-Secret-Key': process.env.REACT_APP_YOKO_SK
        //          }
        //     })
        //    .then((result) => {
        //      res.status(200).send({
        //        result:
        //          "[API] - Successful POST",
        //      });
        //      return result;
        //    })
        //    .catch((err) => {
        //      res.status(500).send({
        //        message:
        //          "Oops, there was a problem: " + err.message,
        //      });
        // });
    //
    );

module.exports = router;