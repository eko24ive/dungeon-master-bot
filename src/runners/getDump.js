require('dotenv').config();
const mongoose = require('mongoose');
const jsonfile = require('jsonfile');

const dungeonSchema = require('../schemes/dungeon');
const getDump = require('../utils/getDump');

const Dungeon = mongoose.model('Dungeon', dungeonSchema);

mongoose.connect(process.env.MONGODB_RUNNER_URI);

getDump(Dungeon, (dump) => {
  jsonfile.writeFile('./dungeons.json', dump, (err) => {
    if (err) console.error(err);
    console.log('done');
  });
  mongoose.disconnect();
});
