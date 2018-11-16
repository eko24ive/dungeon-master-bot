require('dotenv').config();
const mongoose = require('mongoose');
const async = require('async');

const dungeonSchema = require('../schemes/dungeon');

const Dungeon = mongoose.model('Dungeon', dungeonSchema);

mongoose.connect(process.env.MONGODB_URI);

const dungeons = [
  'oldMine',
  'openVault',
  'betCave',
  'hroshgarHigh',
  'scientificComplex',
  'templeOfKnowledge',
  'blackMesa',
  'moltenСore',
  'haloCave',
  'sewerPipe',
  'utkinPass',
  'ruinsOfHexagon',
];

console.log('===START===');

async.forEach(dungeons, (dungeonName, next) => {
  Dungeon.findOne({ name: dungeonName }).then((dungeon) => {
    if (dungeon !== null) {
      next();
    } else {
      const newDungeon = new Dungeon({
        name: dungeonName,
      });

      newDungeon.save().then(() => {
        next();
      });
    }
  });
}, () => {
  console.log('Database seeded');
  mongoose.disconnect();
});
