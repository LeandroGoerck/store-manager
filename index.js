const express = require('express');
const bodyParser = require('body-parser');
// const productsRoutes = require('./routes/productRoutes');
require('dotenv').config();

const SalesController = require('./controllers/salesController');
const ProducsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.send('Hello');
});

// app.use('/products', productsRoutes);

app.get('/products', ProducsController.getAll);
app.get('/products/:id', ProducsController.getById);

app.get('/sales', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);

app.use((err, _req, res, _next) => {
  // console.log(err);
  res.status(400).json(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
