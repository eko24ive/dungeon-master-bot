const {
  dungeonLoot,
} = require('../regexp/regexp');

const parseDungeon = (text) => {
  const [, caps, materials, item, loot] = dungeonLoot.exec(text);

  return {
    caps,
    materials,
    item,
    loot,
  };
};

module.exports = parseDungeon;
