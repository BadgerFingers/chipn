const express = require('express');
require('dotenv').config();

const router = express.Router();

// ---
router.get('/', (req, res) => {
    res.json({ mssg: 'Hello from payment' });
});

// POST new payment
router.post('/', (req, res) => {
    // res.json({ mssg: 'POSTING payment' })
    const headers = { "X-Auth-Secret-Key": process.env.YOKO_SK }
    
    res.status(200).send({
        body: req.body,
        headers: headers
    })

    if(res.status(200)){
        const fetchData = async() => {
            const response = await fetch('https://online.yoco.com/v1/charges/', {
                method: 'POST',
                body: req.body,
                headers: headers,
            })
            const data = await response.json()
            console.log(data)
        }
        fetchData()
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