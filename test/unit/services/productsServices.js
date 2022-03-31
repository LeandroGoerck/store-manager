const { expect } = require('chai');
const sinon = require('sinon');

const ProductsServices = require('../../../services/productsServices');
const ProductsModels = require('../../../models/productsModels');

describe('[service] Insert a new product in DataBase', () => {
  describe('when product is not valid', () => {

    const invalidProduct = {};

    it('returns a boolean', async () => {
      const response = await ProductsServices.create(invalidProduct);
      expect(response).to.be.a('boolean');
    });

    it('the boolean contains "false"', async () => {
      const response = await ProductsServices.create(invalidProduct);
      expect(response).to.be.equal(false);
    });

  });

  describe('when product is valid', () => {

    const validProduct = {
      name: "Monitor ultra wide",
      quantity: 10,
    };

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(ProductsModels, 'create')
        .resolves({ id: ID_EXAMPLE});
    });

    after(() => {
      ProductsModels.create.restore();
    });

    it('returns an object', async () => {
      const response = await ProductsServices.create(validProduct);
      expect(response).to.be.a('object');
    });

    it('that object has the property "id"', async () => {
      const response = await ProductsServices.create(validProduct);
      expect(response).to.have.a.property('id');
    });

  });

});

  describe('2 [service] - "getAll" returns the products list from DataBase', () => {

    const fakeProductList =   [{ name: 'Monitor ultra wide', quantity: 11 },
                               { name: 'Mouse gamer', quantity: 22 },
                               { name: 'HD SSD', quantity: 33 }];
    const fakeResult = {
      status: 200,
      result: fakeProductList,
    };

    before(() => {
      sinon.stub(ProductsModels, 'getAll').resolves(fakeResult)
    });
    after(() => {
      ProductsModels.getAll.restore();
    });
    describe('all the products are being returned', () => {

      it('has a property status', async () => {
        const response = await ProductsModels.getAll();
        expect(response).to.have.a.property('status');
      });

      it('has a property result', async () => {
        const response = await ProductsModels.getAll();
        expect(response).to.have.a.property('result');
      });

      it('status is called with 200', async () => {
        const response = await ProductsModels.getAll();
        expect(response).to.have.a.property('status');
        expect(response.status).to.be.equals(200);
      });
      
      it('result is an array of objects, with name and quantity', async () => {
        const response = await ProductsModels.getAll();
        expect(response.result).to.be.a('array');
        expect(response.result[0]).to.be.a('object');
        expect(response.result[0].name).to.be.a('string');
        expect(response.result[0].quantity).to.be.a('number');
      });
    });
  });


