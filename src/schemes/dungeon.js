const { Schema } = require('mongoose');

const beastScheme = new Schema({
  name: String,
  forwards: [{
    item: String,
    caps: Number,
    materials: Number,
    loot: String,
    time: Number,
    stamp: String,
    user: {
      username: String,
      id: Number,
    },
  }],
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

module.exports = beastScheme;
