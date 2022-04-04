const ERR = require('./errorMessages');
const ProductsModels = require('../models/productsModels');

const createNewProduct = async ({ name, quantity }) => {
  const productFound = await ProductsModels.findByName(name);
  if (productFound.length) {
    throw ERR.PRODUCT_ALREADY_EXISTS;
  }  
  const { id } = await ProductsModels.createNewProduct({ name, quantity });
  return { id, name, quantity };
};

const getAll = async () => {
  const result = await ProductsModels.getAll();
  return {
    status: 200,
    result,
  };
};

const checkProduct = (product) => {
  if (!product) {
    throw ERR.PRODUCT_NOT_FOUNT;
  }
};

const getById = async (id) => {
  const product = await ProductsModels.getById(id);
  checkProduct(product);
  return {
    status: 200,
    product,
  };
};

const updateProduct = async (id, name, quantity) => {
  const product = await ProductsModels.getById(id);
  checkProduct(product);
  const updatedProduct = await ProductsModels.updateProduct({ id, name, quantity });
  return {
    status: 200,
    updatedProduct,
  };
};

module.exports = {
  createNewProduct,
  getAll,
  getById,
  updateProduct,
};