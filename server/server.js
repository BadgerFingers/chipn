require('dotenv').config();
const express = require('express');

const paymentRoutes = require('./routes/payment');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/payment', paymentRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Server listening on port', process.env.PORT);
});