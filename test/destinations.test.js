import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';

const { destination } = models;

chai.use(chaiHttp);
chai.should();

describe('GET /api/topdestinations', () => {
  it('It should get top 3 travelled destinations up a new user', (done) => {
    chai.request(app)
      .get('/api/topdestinations')
      .end((req, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('It should NOT get top destinations  ', (done) => {
    chai
      .request(app)
      .post('/api/topdestination')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});