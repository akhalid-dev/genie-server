const mongo = require('./mongoConnector');
 
exports.getDash = (req, res, next) => {
    mongo.findByItemNumber('233558544516')
    .then(result => {
        console.log(result);
        res.render('dash', {item:result[0]});
    })
    
    
}