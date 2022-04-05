const { expect } = require('chai');
const sinon = require('sinon');

const ProductsServices = require('../../../services/productsServices');
const ProductsController = require('../../../controllers/productsController');


//describe('[productsController] calling controllers create', () => {
  // describe('when payload is invalid', () => {
  //   const response = {};
  //   const request = {};

  //   before(() => {
  //     request.body = {};

  //     response.status = sinon.stub().returns(response);
  //     response.send = sinon.stub().returns();

  //     sinon.stub(ProductsServices, 'create')
  //       .resolves(false);

  //   });

  //   after(() => {
  //     ProductsServices.create.restore();
  //   });

  //   it('status is called with code 400', async () => {
  //     await ProductsController.create(request, response);

  //     expect(response.status.calledWith(400)).to.be.equal(true);
  //   });

  //   it('send is called with "Dados inválidos"', async () => {
  //     await ProductsController.create(request, response);

  //     expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
  //   });

  // })

    // describe('when is successfully inserted', () => {
    //   const response = {};
    //   const request = {};
  
    //   before(() => {
    //     request.body = {
    //       name: 'Monitor ultra wide',
    //       quantity: 10,
    //     };
  
    //     response.status = sinon.stub()
    //       .returns(response);
    //     response.send = sinon.stub()
    //       .returns();

    //       sinon.stub(ProductsServices, 'create')
    //       .resolves(true);
    //   });

    //   after(() => {
    //     ProductsServices.create.restore();
    //   });
  
    //   it('status is called with code 201', async () => {
    //     await ProductsController.create(request, response);
  
    //     expect(response.status.calledWith(201)).to.be.equal(true);
    //   });
  
    //   it('send is called with message "Produto criado com sucesso!"', async () => {
    //     await ProductsController.create(request, response);
  
    //     expect(response.send.calledWith('Produto criado com sucesso!')).to.be.equal(true);
    //   });
  
    // });
// });


describe('[salesController] getAll sales', () => {
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



    describe('[productsController] calling controllers getAll', () => {
      const response = {};
      const request = {};
  
      const fakeProducts = 
      [{ "id": 1, "name": "Martelo de Thor", "quantity": 10 },
       { "id": 2, "name": "Traje de encolhimento", "quantity": 20 },
       { "id": 3, "name": "Escudo do Capitão América", "quantity": 30 }]

      const fakeResult =   { status: 200, result: fakeProducts };

      before(() => {
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
        response.json = sinon.stub().returns();
        sinon.stub(ProductsServices, 'getAll').resolves(fakeResult);
      });

      after(() => {ProductsServices.getAll.restore()});
  
      it('status is called with code 200', async () => {
        await ProductsController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
  
      it('json is called with the result', async () => {
        await ProductsController.getAll(request, response);
        expect(response.json.calledWith(fakeProducts)).to.be.equal(true);
      });
  
    });
});


describe('[productsController] calling controllers getById', () => {

  // describe('when id is invalid', () => {
  //   const FAKE_ID = 1;
  //   const response = {};
  //   const request = {
  //     body: {},
  //     params: { id: FAKE_ID } 
  //   };
  //   before(() => {
  //     response.status = sinon.stub().returns(response);
  //     response.send = sinon.stub().returns();
  //     response.json = sinon.stub().returns();
  //     sinon.stub(ProductsServices, 'getById').resolves(false);
  //   });

  //   after(() => {
  //     ProductsServices.getById.restore();
  //   });

  //   it('status is called with code 400', async () => {
  //     await ProductsController.getById(request, response);
  //     expect(response.status.calledWith(400)).to.be.equal(true);
  //   });

  //   it('send is called with "Dados inválidos"', async () => {
  //     await ProductsController.getById(request, response);
  //     expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
  //   });
  
  // });
  
  describe('when get is successfull', () => {     
    const FAKE_ID = 1;
    const response = {};
    const request = {
      body: {},
      params: { id: FAKE_ID } 
    };
    const serviceResult = {
      status: 200,
      product: [ { id: 1, name: 'Martelo de Thor', quantity: 10 } ]
    }
    const serviceJson = [ { id: 1, name: 'Martelo de Thor', quantity: 10 } ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsServices, 'getById').resolves(serviceResult);
    });

    after(() => {
      ProductsServices.getById.restore();
    });

    it('status is called with code 200', async () => {
      await ProductsController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('json is called with object "serviceJson"', async () => {
      await ProductsController.getById(request, response);
      expect(response.json.calledWith(serviceJson)).to.be.equal(true);
    });
  });
    
});


