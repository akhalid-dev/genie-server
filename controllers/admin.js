const mongo = require('./mongoConnector');
 
exports.getDash = (req, res, next) => {
    const item = mongo.findByItemNumber('233558544559');
    res.render('dash', {item:item});
}