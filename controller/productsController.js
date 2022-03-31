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

module.exports = {
  create,
};