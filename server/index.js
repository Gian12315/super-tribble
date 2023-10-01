require("dotenv").config();
const express = require('express');
const photoRouter = require('./routes/photos.routes.js');
const parser = require('body-parser');
const cors =  require('cors');
const app  = express();


// app.use(cors());
app.use(parser.urlencoded({
    extended: true, limit: '50mb'
}));
app.use(parser.json({ limit: '50mb' }));
app.use('/', photoRouter);
app.listen(8000, () => {
    console.log('Changarro ANDANDO');
});
