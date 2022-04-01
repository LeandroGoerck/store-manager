const ProductsServices = require('../services/productsServices');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await ProductsServices
  .create({ name, quantity });

  if (!product) {
    return res
      .status(400)
      .send('Dados inválidos');
  }

  res
    .status(201)
    .send('Produto criado com sucesso!');
};

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
  try {
    const { id } = req.params;
    const { status, product } = await ProductsServices.getById(id);
    return res.status(status).json(product);
  } catch (err) {
    console.log('err: ', err);
    return res.status(400).send(err.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
};