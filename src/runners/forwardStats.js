require('dotenv').config();
const mongoose = require('mongoose');

const dungeonSchema = require('../schemes/dungeon');
const dungeonsNameMapping = require('../constants/dungeonNameMapping');

const Dungeon = mongoose.model('Dungeon', dungeonSchema);

mongoose.connect(process.env.MONGODB_RUNNER_URI);


Dungeon.find().then((dungeons) => {
  if (dungeons !== null) {
    dungeons.forEach((dungeon) => {
      const humanDungeon = dungeonsNameMapping[dungeon.name];
      console.log(`(${humanDungeon.distance}) ${humanDungeon.name} - ${dungeon.forwards.length} форвардов`);
    });
  }
});
