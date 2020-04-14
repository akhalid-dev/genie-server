const agents = require('../../auxiliary/user-agents');
const rss = require('rss-parser');
const parser = new rss({
    headers: {'User-Agent': agents.get_agent()}
});

const cheerio = require('cheerio');

const parseStore = async ({user, site, delay, sold}) => {
    let link = "http://www.ebay." + site + "/sch/rss/m.html?_ssn=" + user + "&_dmd=7" + "&_ipg=100" + "&_rss=1"; 
    if(sold) {
        link = link + "&LH_Sold=1" + "&LH_Complete=1";
    }
    link = link + "&_pgn=1";
    
    sequencer({link: link, modified: false, delay: delay, items:new Map(), count:0});
    

}

const sequencer = (props) => {
        parsePage(props)
        .then((result) => {
            if(result.modified) {
                const newPageNum = Number(result.link.substring(result.link.lastIndexOf("=") + 1)) + 1;
                const newLink = result.link.substring(0, result.link.lastIndexOf('=') + 1) + newPageNum.toString();
                result.link  = newLink;
                sequencer(result);
            } else {
                for (const entry of result.items.entries()) {
                    console.log(entry);
                }
            }
        })
        .catch((err) => {
            reject(err);
        })

}

const parsePage = ({link, modified, delay, items, count}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            parser.parseURL(link, (err, feed) => {
                if (err) reject(err);
                let change = false;
                feed.items.forEach(entry => {  
                    //Item number from URL:
                    let re = /\?[0-9]*/; 
                    const itemNumber = reverseString(re.exec(reverseString(entry.link))[0]).replace('?','');
                    
                    const url = entry.link;
                    const title = entry.title;
                    const $ = cheerio.load(entry.content, {xmlMode: true});
                    const imageURL = $("img").attr('src');
                    const price = $("strong").text();
                    
                    if (!items.has(itemNumber)) {
                        items.set(itemNumber, {
                            url: url,
                            title: title,
                            imageURL: imageURL,
                            price: price,
                            itemNumber: itemNumber
                        });
                        change = true;
                        count = count + 1;   
                    }
                })
                resolve({link: link, modified: change, count: count, items: items, delay: delay});
            });
        }, delay + Math.random() * 5000);
    })
}

const reverseString = (text) => {
    return text.split("").reverse().join("");
}


//parseStore({user:'achstar91', site:'co.uk', delay:2500, sold:false});


