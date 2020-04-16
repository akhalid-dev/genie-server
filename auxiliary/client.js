const dns = require('dns');

exports.getClient = (req, res, next) => {
    require('dns').reverse(req.connection.remoteAddress, function(err, domains) {
        const domain = domains;
        const addr = req.connection.remoteAddress;
        console.log(domain, addr);
    });
    console.log(req.connection);
    res.render('dash', {item:{url: domain, title:addr}});
    //next();
} 

