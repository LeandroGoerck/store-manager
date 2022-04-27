const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const ProductsModels = require('../../../models/productsModels');


describe('[productsModel]', () => {

  describe('createNewProduct', () => {

    const fakeProduct = { name: 'Martelo de Thor', quantity: 10};
    const fakeResolves = [{ insertId: 15 }];
    const expectedReturn = { id: 15 };

    before(() => {
      sinon.stub(connection, 'execute').resolves(fakeResolves);
    });
    after(() => { connection.execute.restore()});

    describe('the created product id is being returned', () => {

      it('returns an object', async () => {
        const response = await ProductsModels.createNewProduct(fakeProduct);
        expect(response).to.be.a('object');
      });

      it('the object has the key id', async () => {
        const response = await ProductsModels.createNewProduct(fakeProduct);
        expect(response).to.have.all.keys('id');
        expect(response.id).to.be.equals(15);
      });

      it('the id value is a number', async () => {
        const response = await ProductsModels.createNewProduct(fakeProduct);
        expect(response.id).to.be.a('number');
      });
      
      it('all the information is correct', async () => {
        const response = await ProductsModels.createNewProduct(fakeProduct);
        expect(response).to.be.deep.equal(expectedReturn);
      });


    });
  });



  describe('getAll', () => {

  const fakeProductList = [[  { "id": 1, "name": "Martelo de Thor", "quantity": 10 },
                              { "id": 2, "name": "Traje de encolhimento", "quantity": 20 },
                              { "id": 3, "name": "Escudo do Capitão América", "quantity": 30 }]]

    before(() => { sinon.stub(connection, 'execute').resolves(fakeProductList)});
    after(() => { connection.execute.restore()});

    describe('the list is being returned', () => {
      it('returns an array of objects, with id, name and quantity', async () => {
        const response = await ProductsModels.getAll();

        expect(response[0]).to.be.a('object');
        expect(response[0]).to.have.all.keys('id', 'name', 'quantity');
        expect(response[0].id).to.be.equals(1);
        expect(response[0].name).to.be.equals('Martelo de Thor');
        expect(response[0].quantity).to.be.equals(10);

        expect(response[1]).to.be.a('object');
        expect(response[1]).to.have.all.keys('id', 'name', 'quantity');
        expect(response[1].id).to.be.equals(2);
        expect(response[1].name).to.be.equals('Traje de encolhimento');
        expect(response[1].quantity).to.be.equals(20);

        expect(response[2]).to.be.a('object');
        expect(response[2]).to.have.all.keys('id', 'name', 'quantity');
        expect(response[2].id).to.be.equals(3);
        expect(response[2].name).to.be.equals('Escudo do Capitão América');
        expect(response[2].quantity).to.be.equals(30);

      });
    });
  });

    describe('getById', () => {

      const fakeProduct = [[{ id: 1, name: 'Martelo de Thor', quantity: 10}]]
    
      before(() => { sinon.stub(connection, 'execute').resolves(fakeProduct)});
      after(() => { connection.execute.restore()});
    
      describe('the selected product is being returned', () => {
        it('returns an array of objects, with id, name and quantity', async () => {
          const response = await ProductsModels.getById();
          expect(response).to.be.a('object');
          expect(response).to.have.all.keys('id', 'name', 'quantity');
          expect(response.id).to.be.equals(1);
          expect(response.name).to.be.equals('Martelo de Thor');
          expect(response.quantity).to.be.equals(10);
        });
      });
    });

  });
  
  // expect({a: 1, b: 2}).to.have.all.keys('a', 'b');


// describe('[model] Insert a new product on Database', () => {

//   const payloadProduct = {
//     name: 'Monitor ultra wide',
//     quantity: 10,
//   }

//   before(() => {
//     const fakeResult = [{insertId: 1}];

//     sinon.stub(connection, 'execute').resolves(fakeResult)
//   });

//   after(() => {
//     connection.execute.restore();
//   });


//   describe('and its a valid product', () => {

//     it('returns an object', async () => {
//       const response = await ProductsModels.create(payloadProduct);

//       expect(response).to.be.a('object');
//     });

//     it('that object has the property "id"', async () => {
//       const response = await ProductsModels.create(payloadProduct);

//       expect(response).to.have.a.property('id');
//     });

//   });

// });

// describe('2 [model] - Create an endpoint to get the products from DataBase', () => {

//   const fakeProductList =   [[{ name: 'Mouse gamer', quantity: 11 },
//                              { name: 'Monitor ultra wide', quantity: 22 },
//                              { name: 'HD SSD', quantity: 33 }]];
//   before(() => {
//     sinon.stub(connection, 'execute').resolves(fakeProductList)
//   });
//   after(() => {
//     connection.execute.restore();
//   });
//   describe('all the products are being returned', () => {
//     it('returns an array of objects, with name and quantity', async () => {
//       const response = await ProductsModels.getAll();
//       expect(response).to.be.a('array');
//       expect(response[0]).to.be.a('object');
//       expect(response[0].name).to.be.a('string');
//       expect(response[0].quantity).to.be.a('number');
//       expect(response[1]).to.be.a('object');
//       expect(response[1].name).to.be.a('string');
//       expect(response[1].quantity).to.be.a('number');
//     });
//   });
// });
