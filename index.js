const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => (res.send('Hello')));

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use((err, _req, res, _next) => {
  const { status, err: { message } } = err;
  res.status(status).json({ message });
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
