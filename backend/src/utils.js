const throwError = (name, message) => {
  const error = new Error(message);
  error.name = name;
  throw error;
};

const isString = (string) => {
  return typeof string == "string" || string instanceof String;
};

const isNumber = (number) => {
  return (
    typeof number === "number" || number instanceof Number || !isNaN(number)
  );
};

const validateStringProperty = (key, value) => {
  if (!value || !isString(value)) {
    throwError("ValidationError", `Incorrect or missing string: ${key}`);
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
    name: validateStringProperty("name", data.name),
    description: validateStringProperty("description", data.description),
    price: validateNumberProperty("price", data.price),
    quantity: validateNumberProperty("quantity", data.quantity),
    category: validateStringProperty("category", data.category),
    image: validateStringProperty("image", data.image),
    id: validateStringProperty("id", data.id),
  };
  return product;
};

const toOrderedProduct = (data) => {
  const orderedProduct = data.product;
  const product = {
    name: validateStringProperty("name", orderedProduct.name),
    description: validateStringProperty(
      "description",
      orderedProduct.description
    ),
    price: validateNumberProperty("price", orderedProduct.price),
    quantity: validateNumberProperty("quantity", orderedProduct.quantity),
    category: validateStringProperty("category", orderedProduct.category),
    image: validateStringProperty("image", orderedProduct.image),
    id: validateStringProperty("id", orderedProduct.id),
    amount: validateNumberProperty("amount", data.amount),
  };
  return product;
};

const toProductEntry = (data) => {
  const product = {
    name: validateStringProperty("name", data.name),
    description: validateStringProperty("description", data.description),
    price: validateNumberProperty("price", data.price),
    quantity: validateNumberProperty("quantity", data.quantity),
    category: validateStringProperty("category", data.category),
    image: validateStringProperty("image", data.image),
  };
  return product;
};

const toOrder = (data) => {
  const order = {
    user: toUser(data.user),
    products: data.products.map((product) => toOrderedProduct(product)),
    sum: validateNumberProperty("sum", data.sum),
    status: validateStringProperty("status", data.status),
    id: validateStringProperty("id", data.id),
  };
  return order;
};

const toUser = (data) => {
  const user = {
    firstName: validateStringProperty("firstName", data.firstName),
    lastName: validateStringProperty("lastName", data.lastName),
    email: validateStringProperty("email", data.email),
    phone: validateStringProperty("phone", data.phone),
    address: validateStringProperty("address", data.address),
    id: validateStringProperty("id", data.id),
    //role: validateStringProperty('role', data.role)
  };
  return user;
};

const toUserEntry = (data) => {
  const user = {
    firstName: validateStringProperty("firstName", data.firstName),
    lastName: validateStringProperty("lastName", data.lastName),
    email: validateStringProperty("email", data.email),
    phone: validateStringProperty("phone", data.phone),
    address: validateStringProperty("address", data.address),
    role: "user",
    password: validateStringProperty("password", data.password),
  };
  return user;
};

const toLoginCredentials = (data) => {
  const creds = {
    email: validateStringProperty("email", data.email),
    password: validateStringProperty("password", data.password),
  };
  return creds;
};

const toLoggedUser = (data) => {
  const user = {
    id: data.id,
    role: data.role,
  };
  return user;
};

const formatPrice = (price) => {
  const formatter = new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    currencyDisplay: "code",
  });

  const formatted = formatter.format(price);
  return parseFloat(formatted.replace(",", ".").replace("EUR", "").trim());
};

module.exports = {
  validateStringProperty,
  validateNumberProperty,
  throwError,
  toProduct,
  toProductEntry,
  toOrder,
  toUserEntry,
  toUser,
  toLoginCredentials,
  toLoggedUser,
  formatPrice,
};
