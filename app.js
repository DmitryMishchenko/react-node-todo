const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('./routes/todo');
const config = require('./config/config');
const app = express();

mongoose.connect(config.mongoURI)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/todo', todoRoutes);

module.exports = app;