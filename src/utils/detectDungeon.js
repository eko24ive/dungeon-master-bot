const {
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
} = require('../regexp/regexp');

const detectDungeon = (text) => {
  if (oldMineRegExp.test(text)) {
    return 'oldMine';
  }
  if (openVaultRegExp.test(text)) {
    return 'openVault';
  }
  if (betCaveRegExp.test(text)) {
    return 'betCave';
  }
  if (hroshgarHighRegExp.test(text)) {
    return 'hroshgarHigh';
  }
  if (scientificComplexRegExp.test(text)) {
    return 'scientificComplex';
  }
  if (templeOfKnowledgeRegExp.test(text)) {
    return 'templeOfKnowledge';
  }
  if (blackMesaRegExp.test(text)) {
    return 'blackMesa';
  }
  if (moltenСoreRegExp.test(text)) {
    return 'moltenСore';
  }
  if (haloCaveRegExp.text(text)) {
    return 'haloCave';
  }
  if (sewerPipeRegExp.text(text)) {
    return 'sewerPipe';
  }
  if (utkinPassRegExp.text(text)) {
    return 'utkinPass';
  }
  if (ruinsOfHexagonRegExp.text(text)) {
    return 'ruinsOfHexagon';
  }

  return null;
};

module.exports = detectDungeon;
