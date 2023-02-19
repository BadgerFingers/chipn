const express = require('express');

const router = express.Router();

// ---
router.get('/', (req, res) => {
    res.json({ mssg: 'Hello from payment' });
});

// POST new payment
router.post('/', (req, res) => {
    // res.json({ mssg: 'POSTING payment' })
    //
    const fetchData = async() => {
        await fetch(
            "https://online.yoco.com/v1/charges/",{
              headers: {
                  'X-Auth-Secret-Key': process.env.REACT_APP_YOKO_SK
                 }
            })
           .then((result) => {
             res.status(200).send({
               result:
                 "[API] - Successful POST",
             });
             return result;
           })
           .catch((err) => {
             res.status(500).send({
               message:
                 "Oops, there was a problem: " + err.message,
             });
        });
    }
    fetchData();
    //
    });

module.exports = router;