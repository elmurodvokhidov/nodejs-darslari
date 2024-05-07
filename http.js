// http - ushbu modul yordamida ma’lum portni eshitib turuvchi va unga kelgan so’rovlarga javob beruvchi server qurish mumkin.
// const http = require('node:http');
// const server = http.createServer();
// server.listen(5000);
// console.log(`${server.address().port} - portni eshitishni boshladim...`);


// web server qurish
const http = require('node:http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Bosh sahifaga');
        res.end();
    }
    if (req.url === '/api/books') {
        res.write(JSON.stringify(['Clean Code', 'Code Complete', 'The art of Thinking Clearly']));
        res.end();
    }
});
server.listen(5000);
console.log(`${server.address().port} - portni eshitishni boshladim...`);