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
            dataObj['date'] = await newPage.$eval('.title-info-metadata-item-redesign', dates => {
                const date = dates.textContent.trim()
                const mapping = {
                    января: '01',
                    февраля: '02',
                    марта: '03',
                    апреля: '04',
                    мая: '05',
                    июня: '06',
                    июля: '07',
                    августа: '08',
                    сентября: '09',
                    октября: '10',
                    ноября: '11',
                    декабря: '12',
                  }
                    if (date.includes('сегодня')) {
                      const today = new Date();
                      const day = String(today.getDate()).padStart(2, '0');
                      const month = String(today.getMonth() + 1).padStart(2, '0');
                      return `2021-${month}-${day}`;
                    };
                    if (date.includes('вчера')) {
                      const yesterday = new Date();
                      yesterday.setDate(yesterday.getDate() - 1);
                      const day = String(yesterday.getDate()).padStart(2, '0');
                      const month = String(yesterday.getMonth() + 1).padStart(2, '0');
                      return `2021-${month}-${day}`;
                    };
                    const arrowDate = date.split(' ');
                    const month = mapping[arrowDate[1]];
                    const day = arrowDate[0].padStart(2, '0');
                    return `2021-${month}-${day}`;
            });
            
            
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