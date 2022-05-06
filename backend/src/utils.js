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
    throwError('ValidationError', `Incorrect or missing number: ${key}`);
  }
  return value;
};

const toProduct = (data) => {
  return {
    name: data.name,
    description: data.description,
    price: data.price,
    quantity: data.quantity,
    category: data.category,
    image: data.image,
    id: data.id
  };
};

const toOrderedProduct = (data) => {
  const orderedProduct = data.product;
  return {
    name: orderedProduct.name,
    description: orderedProduct.description,
    price: orderedProduct.price,
    quantity: orderedProduct.quantity,
    category: orderedProduct.category,
    image: orderedProduct.image,
    id: orderedProduct.id,
    amount: data.amount
  };
};

const toProductEntry = (data) => {
  return {
    name: validateStringProperty('name', data.name),
    description: validateStringProperty('description', data.description),
    price: validateNumberProperty('price', data.price),
    quantity: validateNumberProperty('quantity', data.quantity),
    category: validateStringProperty('category', data.category),
    image: validateStringProperty('image', data.image)
  };
};

const toOrder = (data) => {
  const order = {
    user: data.user,
    products: data.products.map(product => toOrderedProduct(product)),
    sum: data.sum,
    status: data.status,
    id: data.id,
  };
  return order;
};

const toUser = (data) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    id: data.id,
  };
};

const toUserEntry = (data) => {
  return {
    firstName: validateStringProperty('firstName', data.firstName),
    lastName: validateStringProperty('lastName', data.lastName),
    email: validateStringProperty('email', data.email),
    phone: validateStringProperty('phone', data.phone),
    address: validateStringProperty('address', data.address),
    role: 'user',
    password: validateStringProperty('password', data.password),
  };
};

const toLoginCredentials = (data) => {
  return {
    email: validateStringProperty('email', data.email),
    password: validateStringProperty('password', data.password)
  };
};

const toOrderEntry = (data) => {
  return data.map((item) => {
    return {
      product: validateStringProperty('productId', item.product),
      amount: validateNumberProperty('amount', item.amount)
    };
  });
};

const toAccessTokenData = (data) => {
  return {
    id: data.id,
    role: data.role
  };
};

const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    currencyDisplay: 'code'
  });

  const formatted = formatter.format(price);
  return parseFloat(formatted.replace(',', '.').replace('EUR', '').trim());
};

module.exports = { validateStringProperty, validateNumberProperty, throwError, toProduct, toProductEntry, toOrder, toOrderEntry, toUserEntry, toUser, toLoginCredentials, toAccessTokenData, formatPrice };