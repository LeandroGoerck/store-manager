const { expect } = require('chai');
const sinon = require('sinon');

const SalesServices = require('../../../services/salesServices');
const SalesModels = require('../../../models/salesModels');

describe('[salesServices] - "getAll" returns the products list from DataBase', () => {

  const fakeSales = 
    [ { "saleId": 1, "date": "2022-04-04T23:03:02.000Z", "productId": 1, "quantity": 10 },
      { "saleId": 1, "date": "2022-04-04T23:03:02.000Z", "productId": 2, "quantity": 20 },
      { "saleId": 2, "date": "2022-04-04T23:03:02.000Z", "productId": 3, "quantity": 30 }]
  const fakeResult =   { status: 200, result: fakeSales };

  before(() => { sinon.stub(SalesModels, 'getAll').resolves(fakeResult)});
  after(() => { SalesModels.getAll.restore(); });

  describe('the full sales list is being returned with status 200', () => {

    it('has a property status', async () => {
      const response = await SalesModels.getAll();
      expect(response).to.have.a.property('status');
    });

    it('has a property result', async () => {
      const response = await SalesModels.getAll();
      expect(response).to.have.a.property('result');
    });

    it('status is called with 200', async () => {
      const response = await SalesModels.getAll();
      expect(response).to.have.a.property('status');
      expect(response.status).to.be.equals(200);
    });
    
    it('result is an array of objects, with saleId, date, productId and quantity', async () => {
      const response = await SalesModels.getAll();
      expect(response.result).to.be.a('array');
      expect(response.result[0]).to.be.a('object');

      expect(response.result[0].saleId).to.be.a('number');
      expect(response.result[0].saleId).to.be.equals(1);
      expect(response.result[0].date).to.be.a('string');
      expect(response.result[0].date).to.be.equals('2022-04-04T23:03:02.000Z');
      expect(response.result[0].productId).to.be.a('number');
      expect(response.result[0].productId).to.be.equals(1);
      expect(response.result[0].quantity).to.be.a('number');
      expect(response.result[0].quantity).to.be.equals(10);

      expect(response.result[1].saleId).to.be.equals(1);
      expect(response.result[1].date).to.be.equals('2022-04-04T23:03:02.000Z');
      expect(response.result[1].productId).to.be.equals(2);
      expect(response.result[1].quantity).to.be.equals(20);

    });
  });
});