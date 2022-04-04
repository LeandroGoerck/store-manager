const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const SalesModels = require('../../../models/salesModels');


describe('[salesModel] - Get all', () => {

  const fakeSales = 
    [[ { "saleId": 1, "date": "2022-04-04T23:03:02.000Z", "productId": 1, "quantity": 10 },
      { "saleId": 1, "date": "2022-04-04T23:03:02.000Z", "productId": 2, "quantity": 20 },
      { "saleId": 2, "date": "2022-04-04T23:03:02.000Z", "productId": 3, "quantity": 30 }]]

  before(() => {sinon.stub(connection, 'execute').resolves(fakeSales)});
  after(() => {connection.execute.restore()});

  describe('the full sales list is being returned', () => {
    it('returns an array of objects, with saleId, date, productId and quantity', async () => {
      const response = await SalesModels.getAll();
      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
      expect(response[0].saleId).to.be.a('number');
      expect(response[0].saleId).to.be.equals(1);
      expect(response[0].date).to.be.a('string');
      expect(response[0].date).to.be.equals('2022-04-04T23:03:02.000Z');
      expect(response[0].productId).to.be.a('number');
      expect(response[0].productId).to.be.equals(1);
    });
  });

});