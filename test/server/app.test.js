const chai = require('chai');
const chaiHttp = require('chai-http');
const helper = require('../helper');

const should = chai.should();
const { config } = helper;
const app = require('../../server')(config);

chai.use(chaiHttp);

describe('The Application', () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());
  it('should have an index route', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
  });
  it('should have a reasons route', async () => {
    const res = await chai.request(app).get('/reasons');
    res.should.have.status(200);
  });
  it('should have a all detail of reason route', async () => {
    const res = await chai.request(app).get('/reasons/all');
    res.should.have.status(200);
  });
  it('should have a login route', async () => {
    const res = await chai.request(app).get('/users/login');
    res.should.have.status(200);
  });
  it('should have a registration route', async () => {
    const res = await chai.request(app).get('/users/registration');
    res.should.have.status(200);
  });
  it('should have a admin route', async () => {
    const res = await chai.request(app).get('/users');
    res.should.have.status(200);
  });
});
