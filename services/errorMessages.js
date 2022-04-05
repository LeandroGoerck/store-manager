const PRODUCT_NOT_FOUNT = {
  err: { message: 'Product not found' },
  status: 404,
};

const SALE_NOT_FOUNT = {
  err: { message: 'Sale not found' },
  status: 404,
};

const NAME_IS_REQUIRED = {
  err: { message: '"name" is required' },
  status: 400,
};

const NAME_LENGTH = {
  err: { message: '"name" length must be at least 5 characters long' },
  status: 422,
};

const QUANTITY_IS_REQUIRED = {
  err: { message: '"quantity" is required' },
  status: 400,
};

const QUANTITY_MUST_BE_GREATER_THAN_0 = {
  err: { message: '"quantity" must be greater than or equal to 1' },
  status: 422,
};

const PRODUCT_ID_IS_REQUIRED = {
  err: { message: '"productId" is required' },
  status: 400,
};

const PRODUCT_ALREADY_EXISTS = {
  err: { message: 'Product already exists' },
  status: 409,
};

const INVALID_DATA = {
  err: { message: 'Invalid Data!' },
  status: 400,
};

const SALE_NOT_FOUND = {
  err: { message: 'Sale not found' },
  status: 404,
};

module.exports = {
  PRODUCT_NOT_FOUNT,
  SALE_NOT_FOUNT,
  NAME_IS_REQUIRED,
  NAME_LENGTH,
  QUANTITY_IS_REQUIRED,
  QUANTITY_MUST_BE_GREATER_THAN_0,
  PRODUCT_ID_IS_REQUIRED,
  PRODUCT_ALREADY_EXISTS,
  INVALID_DATA,
  SALE_NOT_FOUND,
};