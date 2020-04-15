const Item = require('../models/shop/items');

const send = () => {
    let map = new Map();
    map.set('233558544516', {
        url: 'https://www.ebay.co.uk/itm/Ladies-Nike-Zoom-Pegasus-32-Womens-Women-Trainers-Gym-Running-Sports-UK-Size-5-5/233558544516?hash=item36612c9084:g:EakAAOSwZ~pd9q~D',
        title: 'Ladies Nike Zoom Pegasus 32 Womens Women Trainers Gym Running Sports UK Size 5.5',
        imageURL: 'https://i.ebayimg.com/thumbs/images/g/EakAAOSwZ~pd9q~D/s-l225.jpg',
        price: '£24.99',
        itemNumber: '233558544516'
      });

    map.set('233558544559',   {
        url: 'https://www.ebay.co.uk/itm/Ladies-Koton-Jacket-Coat-Designer-Womens-Women-Raincoat-Wind-Navy-Blue-Zip-UK-8/233558544559?hash=item36612c90af:g:5KEAAOSwqMteEny9',
        title: 'Ladies Koton Jacket Coat Designer Womens Women Raincoat Wind Navy Blue Zip UK 8',
        imageURL: 'https://i.ebayimg.com/thumbs/images/g/5KEAAOSwqMteEny9/s-l225.jpg',
        price: '£29.99',
        itemNumber: '233558544559'
    });

    map.forEach((value, key, map) => {
        const {url, title, imageURL, price, itemNumber} = value;
        const item = new Item({
            itemNumber: itemNumber,
            url: url,
            title: title,
            imageURL: imageURL,
            price_shop: price
        });
        item.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        }) 
    });
}

send();
module.exports.send = send;