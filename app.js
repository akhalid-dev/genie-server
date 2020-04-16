const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const dbConnectString = require('./config').keys.mongo_connection_string; //*Important* For deployment all Server Variable

const controller = require('./controllers/admin');
const mongoose = require('mongoose');
app.set('view engine', 'ejs');

app.get('/', controller.getDash);
mongoose.connect(dbConnectString, {useNewUrlParser: true})
.then(result => {
    app.listen(port);
})
.catch(err => {
    console.log(err);
})
