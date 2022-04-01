const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send('Hello');
});

app.post('/products', ProductsController.create);
app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.getById);

app.get('/sales', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(201).json(err);
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Escutando na porta ${process.env.APP_PORT}`);
});
