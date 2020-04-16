const dns = require('dns');

exports.getClient = (req, res, next) => {
    require('dns').reverse(req.connection.remoteAddress, function(err, domains) {
        const domain = domains;
        const addr = req.connection.remoteAddress;
        console.log(domain, addr);
        const item = {};
        item.url = domain;
        item.title = addr;

        res.render('dash', {item});
    });
    //next();
} 

