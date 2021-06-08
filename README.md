# scrapping
node-js скрипт на базе Puppeteer, осуществляющий сбор объявлений с авито.

Входные данные - ссылка на страницу с объявлениями (https://www.avito.ru/sankt-peterburg/koshki/poroda-meyn-kun-ASgBAgICAUSoA5IV?metro=2137)

Результат - json файл с массивом объявлений

interface Advert {
  title: string;
  description: string;
  url: string;
  price: number;
  author: string;
  date: string; // ISO-8601
  phone: string;
}
