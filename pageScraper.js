const scraperObject = {
    url: 'https://www.avito.ru/sankt-peterburg/koshki/poroda-meyn-kun-ASgBAgICAUSoA5IV',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Переход на ${this.url}...`);
        await page.goto(this.url);

    }
}

module.exports = scraperObject;