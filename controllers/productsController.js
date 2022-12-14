const ProductsServices = require('../services/productsServices');

const getAll = async (req, res) => {
  try {
    const productList = await ProductsServices.getAll();
    const { status, result } = productList;
    return res.status(status).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getById = async (req, res) => {
    const { id } = req.params;
    const { status, product } = await ProductsServices.getById(id);
    res.status(status).json(product);
};

const createNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsServices.createNewProduct({ name, quantity });

  if (!product) {
    return res.status(400).send('Dados inválidos');
  }
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { status, updatedProduct } = await ProductsServices.updateProduct(id, name, quantity);
  res.status(status).json(updatedProduct);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { status } = await ProductsServices.deleteById(id);
  res.status(status).end();
};

module.exports = {
  getAll,
  getById,
  createNewProduct,
  updateProduct,
  deleteById,
};