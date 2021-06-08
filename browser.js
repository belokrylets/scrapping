const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log("Открытие браузера......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Не удалось создать экземпляр браузера => : ", err);
    }
    return browser;
}

module.exports = {
    startBrowser
};