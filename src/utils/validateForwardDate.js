const validateForwardDate = (date) => {
  if (date < 1537304400) {
    return false;
  }

  return true;
};

module.exports = validateForwardDate;
