// Events - dasturimizda biron-bir narsa(hodisa) ro’y berganligi haqidagi ishorani tushinamiz.
const EventEmitter = require('node:events');
const emitter = new EventEmitter();

emitter.on('loggedIn', () => {
    console.log('Foydalanuvhi muvaffaqiyatli dasturga kirdi!');
});

emitter.emit('loggedIn');

// emitter yordamida ma'lum argument jo'natib uni ustida amal ham bajarishimiz mumkin.