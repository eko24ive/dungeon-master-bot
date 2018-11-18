require('dotenv').config();
const mongoose = require('mongoose');
const async = require('async');
const moment = require('moment');
const jsonfile = require('jsonfile');

const dungeonSchema = require('../schemes/dungeon');
const dungeonsNameMapping = require('../constants/dungeonNameMapping');

const Dungeon = mongoose.model('Dungeon', dungeonSchema);

mongoose.connect(process.env.MONGODB_RUNNER_URI);

const dungeonsToExport = {};

Dungeon.find().then((dungeons) => {
  if (dungeons !== null) {
    async.forEach(dungeons, (dungeon, next) => {
      if (dungeonsToExport[dungeon.name] === undefined) {
        const filteredForwards = dungeon.forwards !== undefined ? dungeon.forwards.map(forward => ({
          item: forward.item,
          caps: forward.caps,
          materials: forward.materials,
          loot: forward.loot,
          time: moment(forward.time * 1000).format('DD.MM.YYYY HH:mm'),
          unixTime: forward.time * 1000,
        })) : [];

        const humanDungeon = dungeonsNameMapping[dungeon.name];

        dungeonsToExport[dungeon.name] = {
          name: humanDungeon.name,
          distance: humanDungeon.distance,
          technicalName: dungeon.name,
          forwards: filteredForwards,
        };

        next();
      } else {
        next();
      }
    }, () => {
      mongoose.disconnect();
      jsonfile.writeFile('./dungeons.json', dungeonsToExport, (err) => {
        if (err) console.error(err);
        console.log('done');
      });
    });
  }
});
