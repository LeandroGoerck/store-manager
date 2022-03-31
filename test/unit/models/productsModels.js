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

  describe('and its NOT a valid product', async () => {

  });

});