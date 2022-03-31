const { expect } = require('chai');
const sinon = require('sinon');

const ProductsServices = require('../../../services/productsServices');
const ProductsController = require('../../../controllers/productsController');


describe('[controller] calling controllers create', () => {
  describe('when payload is invalid', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(ProductsServices, 'create')
        .resolves(false);

    });

    after(() => {
      ProductsServices.create.restore();
    });

    it('status is called with code 400', async () => {
      await ProductsController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('send is called with "Dados inválidos"', async () => {
      await ProductsController.create(request, response);

      expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
    });

  })

    describe('when is successfully inserted', () => {
      const response = {};
      const request = {};
  
      before(() => {
        request.body = {
          name: 'Monitor ultra wide',
          quantity: 10,
        };
  
        response.status = sinon.stub()
          .returns(response);
        response.send = sinon.stub()
          .returns();

          sinon.stub(ProductsServices, 'create')
          .resolves(true);
      });

      after(() => {
        ProductsServices.create.restore();
      });
  
      it('status is called with code 201', async () => {
        await ProductsController.create(request, response);
  
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
  
      it('send is called with message "Produto criado com sucesso!"', async () => {
        await ProductsController.create(request, response);
  
        expect(response.send.calledWith('Produto criado com sucesso!')).to.be.equal(true);
      });
  
    });
});