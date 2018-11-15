const _ = require('underscore');

const testRegExpsOnString = (regexpSet, string, strict, expectation) => {
  try {
    const testedString = regexpSet
      .map(regExp => regExp.test(string));

    if (strict) {
      return testedString.every(test => test === expectation);
    }

    return testedString.some(test => test === expectation);
  } catch (e) {
    return false;
  }
};

const regExpSetMatcher = (string, {
  regexpSet,
}) => {
  let {
    contains,
    either,
    conditional,
    excludes,
  } = regexpSet;

  let containsCheck = true;
  let conditionalCheck = true;
  let excludesCheck = true;
  let eitherCheck = true;

  contains = _.flatten(contains);
  conditional = _.flatten(conditional);
  excludes = _.flatten(excludes);
  either = _.flatten(either);

  if (contains !== undefined && contains.length > 0) {
    containsCheck = testRegExpsOnString(contains, string, true, true);
  }

  if (conditional !== undefined && conditional.length > 0) {
    conditionalCheck = testRegExpsOnString(conditional, string, false, true);
  }

  if (excludes !== undefined && excludes.length > 0) {
    excludesCheck = testRegExpsOnString(excludes, string, true, false);
  }
  if (either !== undefined && either.length > 0) {
    eitherCheck = testRegExpsOnString(either, string, false, true);
  }

  return (containsCheck && conditionalCheck && excludesCheck && eitherCheck);
};

const matcher = (string, regExp) => regExp.test(string);

module.exports = {
  matcher,
  regExpSetMatcher,
};
