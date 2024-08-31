const Bot = require('node-telegram-bot-api');
require('dotenv').config();
const bot = new Bot(process.env.token, { polling: true });

bot.setMyCommands([
    { command: "/start", description: "botni ishga tushirish" },
    { command: "/books", description: "barcha kitoblar ro'yhati" },
    { command: "/info", description: "bot haqida ma'lumot" },
]);

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
        case "/start": return bot.sendMessage(chatId, `Assalomu alaykum, ${msg.chat.first_name}, 👋`);

        case "/info": return bot.sendMessage(chatId, "Bot haqida nima ham derdik, ishlatib turavering, faqat o'chirib tashlamang!");

        case "/books": return bot.sendMessage(chatId, "Hozirda mavjud barcha kitoblar", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Robin Gud", callback_data: "1" }],
                    [{ text: "Peter Pan", callback_data: "2" }],
                    [{ text: "Atomic Habits", callback_data: "3" }],
                ]
            }
        });

        default: return bot.sendMessage(chatId, "Bunday buyruq topilmadi!");
    }
});

bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const request = query.data;

    switch (request) {
        case "1": return bot.sendPhoto(chatId, "https://backend.bookstore.crow.uz/p_robinhood_19884_95b7d851.jpeg");

        case "2": return bot.sendPhoto(chatId, "https://backend.bookstore.crow.uz/p_peterpan_19755_96e77c5b.jpeg");

        case "3": return bot.sendPhoto(chatId, "https://backend.bookstore.crow.uz/cockjta83ve66on48uk0.jpg");

        default: return bot.sendMessage(chatId,);
    }
});