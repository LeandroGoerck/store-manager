const { expect } = require('chai');
const sinon = require('sinon');

const ProductsServices = require('../../../services/productsServices');
const ProductsModel = require('../../../models/productsModels');

describe('Insert a new product in DataBase', () => {
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

      sinon.stub(ProductsModel, 'create')
        .resolves({ id: ID_EXAMPLE});
    });

    after(() => {
      ProductsModel.create.restore();
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