const { expect } = require('chai');
const sinon = require('sinon');

const SalesServices = require('../../../services/salesServices');
const SalesController = require('../../../controllers/salesController');


describe.only('[salesController] getAll sales', () => {
  // describe('when payload is invalid', () => {
  //   const response = {};
  //   const request = {};

  //   before(() => {
  //     request.body = {};
  //     response.status = sinon.stub().returns(response);
  //     response.send = sinon.stub().returns();
  //     response.json = sinon.stub().returns();
  //     sinon.stub(SalesServices, 'getAll').resolves(false);
  //   });

  //   after(() => {SalesServices.getAll.restore()});

  //   it('status is called with code 400', async () => {
  //     await SalesController.getAll(request, response);
  //     expect(response.status.calledWith(400)).to.be.equal(true);
  //   });

  //   it('send is called with "Invalid Data!"', async () => {
  //     await SalesController.getAll(request, response);
  //     expect(response.send.calledWith('Invalid Data!')).to.be.equal(true);
  //   });

  // })

    describe.only('when is successful', () => {
      const response = {};
      const request = {};
  
      const fakeSales = 
        [ { "saleId": 1, "date": "2022-04-04T23:03:02.000Z", "productId": 1, "quantity": 10 },
          { "saleId": 1, "date": "2022-04-04T23:03:02.000Z", "productId": 2, "quantity": 20 },
          { "saleId": 2, "date": "2022-04-04T23:03:02.000Z", "productId": 3, "quantity": 30 }]
      const fakeResult =   { status: 200, result: fakeSales };

      before(() => {

  
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
        response.json = sinon.stub().returns();

        sinon.stub(SalesServices, 'getAll').resolves(fakeResult);
      });

      after(() => {
        SalesServices.getAll.restore();
      });
  
      it('status is called with code 200', async () => {
        await SalesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('json is called with the result', async () => {
        await SalesController.getAll(request, response);
        expect(response.json.calledWith(fakeSales)).to.be.equal(true);
      });
  
    });
});