const parseString = (string) => {
  if (!string || !isString(string)) {
    throw new Error('ValidationError: Incorrect or missing string');
  }
  return string;
};

const parseNumber = (number) => {
  if (!number || !isNumber(number)) {
    throw new Error('ValidationError: Incorrect or missing number');
  }
  return number;
};

const isString = (string) => {
  return typeof string == 'string' || string instanceof String;
};

const isNumber = (number) => {
  return typeof number === 'number' || number instanceof Number;
};

module.exports = { parseString, parseNumber };