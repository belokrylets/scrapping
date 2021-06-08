const scraperObject = {
    url: 'https://www.avito.ru/sankt-peterburg/koshki/poroda-meyn-kun-ASgBAgICAUSoA5IV',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Переход на ${this.url}...`);
        await page.goto(this.url);
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
            dataObj['description'] = await newPage.$eval('.item-description-text > p', text => text.textContent);
            dataObj['url'] = link;
            dataObj['price'] = await newPage.$eval('.price-value-string > span', text => text.textContent);
            dataObj['author'] = await newPage.$eval('.sticky-header-prop > span', text => text.textContent);
            dataObj['date'] = await newPage.$eval('.title-info-metadata-item-redesign', text => text.textContent);
            
            
            resolve(dataObj);
            await newPage.close();
        });

        for(link in urls){
            let currentPageData = await pagePromise(urls[link]);
            console.log(currentPageData);
        }

    }
}

module.exports = scraperObject;