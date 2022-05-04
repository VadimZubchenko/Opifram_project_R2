const throwError = (name, message) => {
  const error = new Error(message);
  error.name = name;
  throw error;
};

const isString = (string) => {
  return typeof string == 'string' || string instanceof String;
};

const isNumber = (number) => {
  return typeof number === 'number' || number instanceof Number || !isNaN(number);
};

const validateStringProperty = (key, value) => {
  if (!value || !isString(value)) {
    throwError('ValidationError', `Incorrect or missing string: ${key}`);
  }
  return value;
};

const validateNumberProperty = (key, value) => {
  if (!value || !isNumber(value)) {
    throwError(`ValidationError', 'Incorrect or missing number: ${key}`);
  }
  return value;
};

const toProduct = (data) => {
  const product = {
    name: validateStringProperty('name', data.name),
    description: validateStringProperty('description', data.description),
    price: validateNumberProperty('price', data.price),
    quantity: validateNumberProperty('quantity', data.quantity),
    category: validateStringProperty('category', data.category),
    image: validateStringProperty('image', data.image)
  };
  return product;
};

module.exports = { parseString: validateStringProperty, parseNumber: validateNumberProperty, throwError, toProduct };