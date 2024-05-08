// Restful (Representational State Transfer) - bu ma'lumotlarga kirish va ulardan foydalanish uchun HTTP so'rovlaridan foydalanadigan dasturlash interfeysi (API). Restful xizmati bizga o’sha ma’lumot ustida CRUD amallarini bajarishni imkonini beradi.
// Avvalgi darslarimizning birida aynan shunday xizmat ko'rsatuvchi kichik dastur qurgan edik...
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
// Albatta kichkina Restful xizmatlari uchun manashunday to’g’ridan-to’g’ri HTTP modulidan foydalanib dastur tuzsak bo’ladi, lekin kattaroq dasturlarga bunday yo’nalish to’g’ri kelmaydi. Chunki ularda endpoint’lar ko’p bo’lishi mumkin.
// endpoint'ga misol
const endpoint1 = '/';
const endpoint2 = '/api/books';
const endpoint3 = '/api/users/john';
// Bunda dasturdagi har bir endpoint'ni handle qilish uchun if/else blokidan foydalanadigan bo'lsak, u holda yozgan kodlarimiz hard code bo'lib qoladi. Unda ularni to'g'ri handle qilish uchun qanday yo'l tutish lozim...?
// Node JS’da Restful API xizmatini taqdim etuvchi dasturlarni qurishda Express JS framework’dan foydalanish eng to’g’ri yechim. Express bu Restful API dasturlarini tezda qurib bera oluvchi, Node JS uchun mo’ljallangan framework.

// HTTP Protocol - bu client(frontend) va server(backend)ni bog'lovchi ya'ni ular ikkisi ham tushinadigan yagona protokol hisoblanadi, uning yordamida ular o'zaro ma'lumot almashishadi. Server tomonda bir qancha endpoint’lar ochib qo’yiladi. Client tomondagi dastur esa o’sha endpoint’larga http so’rovlarini jo’natib, server bilan muloqot qiladi.
// Manashunday http protocolida ishlovchi veb xizmatlarni  Restful xizmati yoki Restful api deb ataladi.