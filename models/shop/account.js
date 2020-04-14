const agents = require('../../auxiliary/user-agents');
const rss = require('rss-parser');
const parser = new rss({
    headers: {'User-Agent': agents.get_agent()}
});

const cheerio = require('cheerio');

const parseStore = (user, site, proxy='', delay) => {
    let link = proxy + "http://www.ebay." + site + "/sch/rss/m.html?_ssn=" + user + "&_dmd=7" + "&_ipg=200" + "&_rss=1" + "&_pgn=1";
    parsePage({link: link, modified: false}, {}, delay)
    .then((props, items) => {
        console.log(props)
        if(props.modified) {
            //const newLink = link + 1;
            // parsePage({link: newLink, modified: false}, items, delay)
        } else {

        }
    })
    .catch((err) => {
        console.log(err);
    })
}

const parsePage = (props, items={}, delay=5000) => { // props {link: '', modified: ''}
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            parser.parseURL(props.link, (err, feed) => {
                if (err) reject(err);

                feed.items.forEach(entry => {     
                    //Item number from URL:
                    let re = /\?[0-9]*/; 
                    const itemNumber = reverseString(re.exec(reverseString(entry.link))[0]).replace('?','');
                    
                    const url = entry.link;
                    const title = entry.title;
                    const $ = cheerio.load(entry.content, {xmlMode: true});
                    const imageURL = $("img").attr('src');
                    const price = $("strong").text();
                    
                    if (!items.hasOwnProperty(itemNumber)) {
                        items[itemNumber] = ({
                            url: url,
                            title: title,
                            imageURL: imageURL,
                            price: price,
                            itemNumber: itemNumber
                        });
                        props.modified = true;
                    }
                })
                resolve(props, items);
            });
        }, delay + Math.random() * 5000);
    })
}

const reverseString = (text) => {
    return text.split("").reverse().join("");
}

parseStore('hockey-grandpa', 'ca', 1);
//parseStore('achstar91', 'co.uk')


