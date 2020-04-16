const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const dbConnectString = process.env.MONGO_CONNECTION || require('./config').keys.mongo_connection_string; 

const controller = require('./controllers/admin');
const mongoose = require('mongoose');
const client = require('./auxiliary/client');
app.set('view engine', 'ejs');

app.get('/', client.getClient);
//app.get('/', controller.getDash);
mongoose.connect(dbConnectString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    app.listen(port);
})
.catch(err => {
    console.log(err);
})
