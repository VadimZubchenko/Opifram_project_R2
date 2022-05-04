const parseString = (string) => {
  if (!string || !isString(string)) {
    throwError('ValidationError', 'Incorrect or missing string');
  }
  return string;
};

const parseNumber = (number) => {
  if (!number || !isNumber(number)) {
    throwError('ValidationError', 'Incorrect or missing number');
  }
  return number;
};

const isString = (string) => {
  return typeof string == 'string' || string instanceof String;
};

const isNumber = (number) => {
  return typeof number === 'number' || number instanceof Number;
};

const throwError = (name, message) => {
  const error = new Error(message);
  error.name = name;
  throw error;
};

module.exports = { parseString, parseNumber, throwError };