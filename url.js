// const url = require('node:url');
const myURL = new URL('https://www.shopmichaeljackson.com/product/Y4AMMJ002/michael-jackson-michael-jackson-live-at-wembley-july-16-1988-dvd?cp=100598_101209_101234');

// url manzilini to'lliq holatda olish
console.log(myURL.href);
// port bilan birga domenni olish
console.log(myURL.host);
// domenni o'zini olish
console.log(myURL.hostname);
// url manzilidagi path (yo'lak) ni olish
console.log(myURL.pathname);
// query string parametrlarini olish
console.log(myURL.search);