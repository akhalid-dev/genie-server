const agents = require('../../auxiliary/user-agents');
const rss = require('rss-parser');
const parser = new rss({
    headers: {'User-Agent': agents.get_agent()}
});

const cheerio = require('cheerio');

const parseStore = ({user, site, delay, sold}) => {
    let link = "http://www.ebay." + site + "/sch/rss/m.html?_ssn=" + user + "&_dmd=7" + "&_ipg=200" + "&_rss=1"; 
    if(sold) {
        link = link + "&LH_Sold=1" + "&LH_Complete=1";
    }
    link = link + "&_pgn=1";
    
    parsePage({link: link, modified: false, delay: delay, items:{}})
    .then(({link, modified, count, items}) => {
        if(modified) {
            console.log("called...");
            const newPageNum = Number(link.substring(link.lastIndexOf("=") + 1)) + 1;
            const newLink = link.substring(0, link.lastIndexOf('=') + 1) + newPageNum.toString();
            console.log(newLink);
            parsePage({link: link, modified: modified, count: count, items: items});
        } else {

        }
    })
    .catch((err) => {
        console.log(err);
    })
}

const parsePage = ({link, modified, delay, items}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            parser.parseURL(link, (err, feed) => {
                if (err) reject(err);
                let count = 0;
                feed.items.forEach(entry => {  
                    count = count + 1;   
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
                        modified = true;
                    }
                })
                console.log(count);
                resolve({link: link, modified: modified, count: count, items: items});
            });
        }, delay + Math.random() * 5000);
    })
}

const reverseString = (text) => {
    return text.split("").reverse().join("");
}


parseStore({user:'achstar91', site:'co.uk', delay:1, sold:true});
//parseStore('achstar91', 'co.uk')

