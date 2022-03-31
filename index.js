const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const ProductsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send('Hello');
});

app.post('/products', ProductsController.create);
app.get('/products', ProductsController.getAll);

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(201).json(err);
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Escutando na porta ${process.env.APP_PORT}`);
});
