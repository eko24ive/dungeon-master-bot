require('dotenv').config();


const TeleBot = require('telebot');
const mongoose = require('mongoose');

const regexps = require('./regexp/regexp');
const parseDungeon = require('./parsers/parseDungeon');

const {
  regExpSetMatcher,
} = require('./utils/matcher');
const validateForwardDate = require('./utils/validateForwardDate');
const detectDungeon = require('./utils/detectDungeon');

const dungeonSchema = require('./schemes/dungeon');

const Dungeon = mongoose.model('Dungeon', dungeonSchema);

mongoose.connect(process.env.MONGODB_URI);

const bot = new TeleBot(process.env.BOT_TOKEN);

const createOrUpdateDungeon = (dungeonData, cb) => {
  Dungeon.findOne({ name: dungeonData.name }).then((dungeon) => {

  });
};

bot.on(['/start', '/help'], msg => msg.reply.text(
  `
Привет, я ПАПа - «<b>Пиздатый Анализатор Подземелей</b>».
Меня создали много тысячь лет назад. И всё для того что бы разгадать секрет газеток.

Отправляй мне форвард с лутом из следующих подземелий, я его обработаю:
<code> ⬦ 11км - Старая Шахта
 ⬦ 29км - Открытое убежище
 ⬦ 34км - Бэт-Пещера
 ⬦ 45км - Высокий Хротгар
 ⬦ 56км - Научный Комплекс
 ⬦ 69км - Храм Знаний
 ⬦ 74км - Черная Меза
 ⬦ 80км - Огненные Недра</code>


Связь с моим мастером (ему стоит сообщать о найденных багах) - @eko24
Чат по исследованию пустоши - @RI_Agroprom

Перед началом работы со мной рекомендую заглянуть в /faq.
        `, {
    parseMode: 'html',
    webPreview: false,
  },
));


bot.on('forward', (msg) => {
  if (msg.forward_from.id !== 430930191) {
    return msg.reply.text(`
Ты заёбал. Форварды принимаються только от @WastelandWarsBot.
            `, {
      asReply: true,
    });
  }

  if (!validateForwardDate(msg.forward_date)) {
    return msg.reply.text('❌<b>ЗАМЕЧЕНА КРИТИЧЕСКАЯ ОШИБКА</b>❌\n\nБыл замечен форвард, время которого меньше, чем время последнего обновления Wasteland Wars (19.09.2018)', {
      asReply: true,
      parseMode: 'html',
    });
  }

  if (regExpSetMatcher(msg.text, {
    regexpSet: regexps.dungeon,
  })) {
    const dungeonName = detectDungeon(msg.text);

    if (dungeonName !== null) {
      const dungeonData = parseDungeon(msg.text);

      createOrUpdateDungeon({
        name: dungeonName,
        ...dungeonData,
        stamp: `${msg.from.id}+${msg.forward_date}`,
        user: {
          username: msg.from.username,
          id: msg.from.id,
        },
      });
    }
    return msg.reply.text(detectDungeon(msg.text));
  }

  return msg.reply.text('Прости, но этот форвард меня не интересует :с');
});

bot.start();
