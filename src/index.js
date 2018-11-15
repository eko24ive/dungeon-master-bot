require('dotenv').config();
const TeleBot = require('telebot');
const mongoose = require('mongoose');
const async = require('async');

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

const sessions = {};

const createSession = (id) => {
  sessions[id] = {
    state: 'WAIT_FOR_FORWARD',
    data: [],
  };
};

const setState = (id, state) => {
  sessions[id].state = state;
};

const getState = (id) => {
  if (sessions[id] !== undefined) {
    return sessions[id].state;
  }

  return null;
};

const getSessionData = id => sessions[id].data || null;

const pushSessionData = (id, data) => {
  sessions[id].data.push(data);
};


const updateDungeons = (msg, dungeons) => {
  let dupes = 0;

  async.forEach(dungeons, (iDungeon, next) => {
    Dungeon.findOne({ name: iDungeon.name }).then((dungeon) => {
      const isForwardDupe = dungeon.toJSON().forwards.some(({ stamp }) => stamp === iDungeon.stamp);

      if (!isForwardDupe) {
        dungeon.forwards.push(iDungeon);

        dungeon.markModified('forwards');
      } else {
        dupes += 1;
      }

      dungeon.save(() => {
        next();
      });
    });
  }, () => {
    const allDupes = dupes === dungeons.length;
    const someDupes = dupes > 0;
    const someDupesReply = someDupes ? '\nБыли замечены дубликаты.' : '';
    if (allDupes) {
      msg.reply.text('Я не увидел новых форвардов', {
        replyMarkup: bot.keyboard([
          ['Отправить пачку'],
        ], {
          resize: true,
          once: true,
          remove: true,
        }),
      });
    } else {
      msg.reply.text(`Я успешно обработал информацию и сохранил ёё в базу${someDupesReply}`, {
        replyMarkup: bot.keyboard([
          ['Отправить пачку'],
        ], {
          resize: true,
          once: true,
          remove: true,
        }),
      });
    }

    createSession(msg.from.id);
  });
};

bot.on(['/start', '/help'], (msg) => {
  createSession(msg.from.id);

  return msg.reply.text(`Привет, я ПАПа - «<b>Пиздатый Анализатор Подземелей</b>».
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

Перед началом работы со мной рекомендую заглянуть в /faq.`, {
    parseMode: 'html',
    webPreview: false,
    replyMarkup: bot.keyboard([
      ['Отправить пачку'],
    ], {
      resize: true,
      once: true,
      remove: true,
    }),
  });
});

bot.on('text', (msg) => {
  switch (msg.text) {
    case 'Отправить пачку':
      setState(msg.from.id, 'WAIT_FOR_FORWARDS');

      return msg.reply.text('Окей, жду твои форварды. Как закончишь - жми Стоп', {
        replyMarkup: bot.keyboard([
          ['Стоп'],
        ], {
          resize: true,
          once: true,
          remove: true,
        }),
      });
    case 'Стоп': {
      const sessionData = getSessionData(msg.from.id);

      if (sessionData !== null) {
        return updateDungeons(msg, sessionData);
      }

      return msg.reply.text('Сорян, похоже меня перезагрузил какой-то пидор');
    }

    default:
      return null;
  }
});


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
    const state = getState(msg.from.id);

    if (dungeonName !== null) {
      const dungeonData = parseDungeon(msg.text);

      const dungeon = {
        name: dungeonName,
        ...dungeonData,
        stamp: `${msg.from.id}+${msg.forward_date}`,
        time: msg.forward_date,
        user: {
          username: msg.from.username,
          id: msg.from.id,
        },
      };

      if (state !== null) {
        if (state === 'WAIT_FOR_FORWARDS') {
          pushSessionData(msg.from.id, dungeon);
        } else {
          updateDungeons(msg, [
            dungeon,
          ]);
        }
      } else {
        updateDungeons(msg, [
          dungeon,
        ]);
      }
    }
  } else {
    return msg.reply.text('Прости, но этот форвард меня не интересует :с');
  }

  return null;
});

bot.on('/seed', (msg) => {
  if (msg.from.id !== 99120720) {
    return;
  }

  const dungeons = [
    'oldMine',
    'openVault',
    'betCave',
    'hroshgarHigh',
    'scientificComplex',
    'templeOfKnowledge',
    'blackMesa',
    'moltenСore',
  ];

  async.forEach(dungeons, (dungeon, next) => {
    const newDungeon = new Dungeon({
      name: dungeon,
    });

    newDungeon.save().then(() => {
      next();
    });
  }, () => {
    msg.reply.text('Database seeded', {
      asReply: true,
    });
  });
});

bot.on('/faq', msg => msg.reply.text(`
1. Если ты хочешь скинуть несколько форвардов - рекомендую воспользоваться режимом "Отправить Пачку". В противном случае бот временно тебя "замьютит" на две-три минуты.

2. Бот пока не поддерживает фичу с выводом собранных данных. Хочешь получить дамп - пиши моему создателю (@eko24)
`));

bot.start();
