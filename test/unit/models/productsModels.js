const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../models/connection');

const ProductsModels = require('../../../models/productsModels');


describe('Insert a new product on Database', () => {

  const payloadProduct = {
    name: 'Monitor ultra wide',
    quantity: 10,
  }

  before(() => {
    const fakeResult = [{insertId: 1}];

    sinon.stub(connection, 'execute').resolves(fakeResult)
  });

  after(() => {
    connection.execute.restore();
  });


  describe('and its a valid product', () => {

    it('returns an object', async () => {
      const response = await ProductsModels.create(payloadProduct);

      expect(response).to.be.a('object');
    });

    it('that object has the property "id"', async () => {
      const response = await ProductsModels.create(payloadProduct);

      expect(response).to.have.a.property('id');
    });

  });

});

describe('2 - Create an endpoint to get the products from DataBase', () => {

  const fakeProductList =   [{ name: 'Monitor ultra wide', quantity: 11 },
                             { name: 'Mouse gamer', quantity: 22 },
                             { name: 'HD SSD', quantity: 33 }];
  before(() => {
    sinon.stub(connection, 'execute').resolves(fakeProductList)
  });
  after(() => {
    connection.execute.restore();
  });
  describe('all the products are being returned', () => {
    it('returns an array of objects, with name and quantity', async () => {
      const response = await ProductsModels.getAll();
      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
      expect(response[0].name).to.be.a('string');
      expect(response[0].quantity).to.be.a('number');
    });
  });

});