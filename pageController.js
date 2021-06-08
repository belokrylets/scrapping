const pageScraper = require('./pageScraper');
const fs = require('fs');

async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        let scrapedData = {};
        scrapedData['interface Advert'] = await pageScraper.scraper(browser);
        await browser.close();
        fs.writeFile("data.json", JSON.stringify(scrapedData, null, 2), 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("Данные были скопированы и успешно сохранены! Посмотреть его на './data.json'");
        });
    }
    catch(err){
        console.log("Не удалось разрешить экземпляр браузера => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)