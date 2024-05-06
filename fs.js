// fs(File System) - node ichida fayllar bilan ishlash uchun mo’ljallangan modul.
const fs = require('node:fs');

// readdir() - ushbu funksiya parametrda berilgan papakada joylashgan fayllar ro’yhatini qaytarib beradi.
fs.readdir('./', function (err, files) {
    console.log(files);
});

// readFile() - ushbu funsiya berilgan faylni ichidagi ma’lumotni o’qib qaytarib beradi.
fs.readFile('./fs.js', 'utf-8', function(err, fileContent) {
	console.log(fileContent);
});