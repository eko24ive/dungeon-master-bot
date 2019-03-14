const {
  dungeonLootWithItemRegExp,
  dungeonLootWithoutItemRegExp,
} = require('../regexp/regexp');

const escapeItem = item => item.replace(' 👎', '');

const parseDungeon = (text) => {
  if (dungeonLootWithoutItemRegExp.test(text)) {
    const [, caps, materials, loot] = dungeonLootWithoutItemRegExp.exec(text);

    return {
      caps,
      materials,
      item: null,
      loot,
    };
  } if (dungeonLootWithItemRegExp.test(text)) {
    const [, caps, materials, item, loot] = dungeonLootWithItemRegExp.exec(text);

    return {
      caps,
      materials,
      item: escapeItem(item),
      loot,
    };
  }
  return null;
};

module.exports = parseDungeon;
