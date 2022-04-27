const { expect } = require('chai');
const sinon = require('sinon');

const ProductsServices = require('../../../services/productsServices');
const ProductsModels = require('../../../models/productsModels');

describe('[productsServices]', () => {

  describe('createNewProduct', () => {
    describe('when product is not valid', () => {

    //   const invalidProduct = {};

    //   it('returns a boolean', async () => {
    //     const response = await ProductsServices.createNewProduct(invalidProduct);
    //     expect(response).to.be.a('boolean');
    //   });

    //   it('the boolean contains "false"', async () => {
    //     const response = await ProductsServices.createNewProduct(invalidProduct);
    //     expect(response).to.be.equal(false);
    //   });

    // });

    describe('when product is valid', () => {

        const validProduct = { name: "Monitor ultra wide", quantity: 10 };

        before(() => {const ID_EXAMPLE = 1;
          sinon.stub(ProductsModels, 'createNewProduct').resolves({ id: ID_EXAMPLE})
          sinon.stub(ProductsModels, 'findByName').resolves([]);
        });

        after(() => {ProductsModels.createNewProduct.restore()});

        it('returns an object with id, name and quantity', async () => {
          const response = await ProductsServices.createNewProduct(validProduct);
          expect(response).to.be.a('object');
          expect(response).to.have.all.keys('id', 'name', 'quantity');
        });
      });
    });
  });

    describe('"getAll" returns the products list from DataBase', () => {

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

    describe('"getById" returns a product from DataBase', () => {

      const fakeProduct =   [{ name: 'Monitor ultra wide', quantity: 11, id: 1 }];

      const fakeResult = {
        status: 200,
        result: fakeProduct,
      };

      before(() => {
        sinon.stub(ProductsModels, 'getById').resolves(fakeResult)
      });
      after(() => {
        ProductsModels.getById.restore();
      });
      describe('when a result have returned', () => {

        it('has a property status', async () => {
          const response = await ProductsModels.getById();
          expect(response).to.have.a.property('status');
        });

        it('has a property result', async () => {
          const response = await ProductsModels.getById();
          expect(response).to.have.a.property('result');
        });

        it('status is called with 200', async () => {
          const response = await ProductsModels.getById();
          expect(response).to.have.a.property('status');
          expect(response.status).to.be.equals(200);
        });
        
        it('result is an array of objects, with name and quantity', async () => {
          const response = await ProductsModels.getById();
          expect(response.result).to.be.a('array');
          expect(response.result[0]).to.be.a('object');
          expect(response.result[0].id).to.be.a('number');
          expect(response.result[0].name).to.be.a('string');
          expect(response.result[0].quantity).to.be.a('number');
        });
      });
    });

});
