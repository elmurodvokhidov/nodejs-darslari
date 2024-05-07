// Readable va Writable Stream dan foydalanish
const http = require('node:http');
const fs = require('node:fs');

const myReadStream = fs.createReadStream(__dirname + '/lyrics.txt', 'utf-8');
const myWriteStream = fs.createWriteStream(__dirname + '/newLyrics.txt');

myReadStream.on('data', (chunk) => {
    console.log('new chunk received:');
    myWriteStream.write(chunk);
});