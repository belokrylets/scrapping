const scraperObject = {
    url: 'https://www.avito.ru/sankt-peterburg/koshki/poroda-meyn-kun-ASgBAgICAUSoA5IV?metro=2137',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Переход на ${this.url}...`);
        await page.goto(this.url);
        let scrapedData = [];
        await page.waitForSelector('.items-items-38oUm');
       
        let urls = await page.$$eval('.iva-item-content-m2FiN', links => {
            links = links.map(el => el.querySelector('div > a').href)
            return links;        
        });

           
           let pagePromise = (link) => new Promise(async(resolve, reject) => {
            let dataObj = {};
            let newPage = await browser.newPage();
            await newPage.goto(link);
            dataObj['title'] = await newPage.$eval('.title-info-title > span', text => text.textContent);
            dataObj['description'] = await newPage.$eval('.item-description-text > p', description => description.textContent);
            dataObj['url'] = link;
            dataObj['price'] = await newPage.$eval('.price-value-string', price => Number(price.textContent.trim().replace(/[^\d]+/g,""))) 
            dataObj['author'] = await newPage.$eval('.sticky-header-prop > span', author => author.textContent);
            dataObj['date'] = await newPage.$eval('.title-info-metadata-item-redesign', date => date.textContent.trim());
            
            
            resolve(dataObj);
            await newPage.close();
        });

        for(link in urls){
            let currentPageData = await pagePromise(urls[link]);
            scrapedData.push(currentPageData);
        }
        return scrapedData;
    }
}

module.exports = scraperObject;