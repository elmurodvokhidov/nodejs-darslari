// os - ushbu modul ichida operatsion tizim bilan ishlaydigan har xil funksiyalar mavjud.
const os = require('node:os');

// komputerdagi bo’sh xotira miqdorini aniqlab beradi.
console.log(os.freemem());
// komputerdagi umumiy xotira miqdorini aniqlab beradi.
console.log(os.totalmem());
// komputer qanchadan beri ishlayotganligini qaytaradi.
console.log(os.uptime());
// hozirgi foydalanuvchi haqidagi ma’lumot qaytaradi.
console.log(os.userInfo());