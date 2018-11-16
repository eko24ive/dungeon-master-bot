const oldMineRegExp = /Казалось, что этой шахте нет конца\./;
const openVaultRegExp = /Ты уже и не надеялся найти в убежище хоть что-то интересное\./;
const betCaveRegExp = /Ты дошел до тупика\. Похоже, это конец пещеры\./;
const hroshgarHighRegExp = /Стоп\.\.\. Это что, конец\? Всё\? Вот она, ебучая вершина горы\?/;
const scientificComplexRegExp = /Ты умудрился найти что-то полезное для себя\./;
const templeOfKnowledgeRegExp = /Ты нашел древние свитки, которые несут в себе тайны мироздания\.\.\./;
const blackMesaRegExp = /Ты забрал кейс у этого пафосного неадеквата и поторопился увидеть его содержимое\./;
const moltenСoreRegExp = /Экзекутос предатель, Рагнароса разбудили слишком рано/;
const haloCaveRegExp = /Ты углубился в пещеру\.\.\.Из глубины пещеры показался металлический люк/;
const sewerPipeRegExp = /Как оказалось, даже в канализации ты умудрился найти что-то полезное\./;
const utkinPassRegExp = /Ты дошел до каких-то палаток\./;
const ruinsOfHexagonRegExp = /Эти коридоры вообще заканчиваются\?!/;

const dungeonLoot = /Найдено: 🕳(\d*) и 📦(\d*)\nНайдено:.+\n(.*)\n(.*)/;

const dungeon = {
  contains: [
    dungeonLoot,
  ],
  either: [
    oldMineRegExp,
    openVaultRegExp,
    betCaveRegExp,
    hroshgarHighRegExp,
    scientificComplexRegExp,
    templeOfKnowledgeRegExp,
    blackMesaRegExp,
    moltenСoreRegExp,
    haloCaveRegExp,
    sewerPipeRegExp,
    utkinPassRegExp,
    ruinsOfHexagonRegExp,
  ],
};

module.exports = {
  dungeon,
  oldMineRegExp,
  openVaultRegExp,
  betCaveRegExp,
  hroshgarHighRegExp,
  scientificComplexRegExp,
  templeOfKnowledgeRegExp,
  blackMesaRegExp,
  moltenСoreRegExp,
  haloCaveRegExp,
  sewerPipeRegExp,
  utkinPassRegExp,
  ruinsOfHexagonRegExp,

  dungeonLoot,
};
