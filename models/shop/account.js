const agents = require('../../auxiliary/user-agents');
const rss = require('rss-parser');
const parser = new rss({
    headers: {'User-Agent': agents.get_agent()}
});

const cheerio = require('cheerio');

const parseStore = (user, site, proxy='') => {
    let link = "http://www.ebay." + site + "/sch/rss/m.html?_ssn=" + user + "&_dmd=7" + "&_ipg=200" + "&_rss=1" + "&_pgn=1";
    parsePage(link);
}

const parsePage = link => {
    return new Promise((resolve, reject) => {

    })
    parser.parseURL(link, (err, feed) => {
        if (err) throw err;
        feed.items.forEach(function(entry) {     
            //Item number from URL:
            let re = /\?[0-9]*/; 
            const itemNumber = reverseString(re.exec(reverseString(entry.link))[0]).replace('?','');
            
            const link = entry.link;
            const title = entry.title;
            const $ = cheerio.load(entry.content, {xmlMode: true});
            const imageURL = $("img").attr('src');
            const price = $("strong").text();
            
        })
    });
}

const reverseString = (text) => {
    return text.split("").reverse().join("");
}


