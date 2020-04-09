const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

const controller = require('./controllers/admin');

app.set('view engine', 'ejs');

app.get('/', controller.getShop);

app.listen(port);