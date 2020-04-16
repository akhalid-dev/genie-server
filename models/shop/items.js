const mongoose = require('mongoose');
const dbConnectString = require('../../config').keys.mongo_connection_string; //remove when deployment

mongoose.connect(dbConnectString, {useNewUrlParser: true, useUnifiedTopology: true });  //remove when deployment

const Schema = mongoose.Schema;
const itemSchema = new Schema({
    itemNumber: {
        type: String, 
        required: true
    },
    url: String,
    title: String, 
    imageURL: String,
    price_shop: {
        type: String, 
        required: true
    },
    price_supplier: String,
    sku: String
});

module.exports = mongoose.model('Items', itemSchema); 
