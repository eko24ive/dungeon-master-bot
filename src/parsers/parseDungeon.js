const {
  dungeonLootWithItemRegExp,
  dungeonLootWithoutItemRegExp,
} = require('../regexp/regexp');

const parseDungeon = (text) => {
  if (dungeonLootWithItemRegExp.test(text)) {
    const [, caps, materials, item, loot] = dungeonLootWithItemRegExp.exec(text);

    return {
      caps,
      materials,
      item,
      loot,
    };
  } if (dungeonLootWithoutItemRegExp.test(text)) {
    const [, caps, materials, loot] = dungeonLootWithoutItemRegExp.exec(text);

    return {
      caps,
      materials,
      item: null,
      loot,
    };
  }

  return null;
};

module.exports = parseDungeon;
