import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';

let token;
const { user } = models;
chai.should();
chai.use(chaiHttp);
const cleanAlltables = async () => {
  await user.destroy({ where: {} });
};

describe('POST /api/users/signup', () => {
  before(async () => {
    await cleanAlltables();
  });
  it('should POST a new User', async (done) => {
    const createdUser = {
      fname: 'Uwimana',
      lname: 'Anisie',
      phone: '0788314143',
      email: 'uwa102@gmail.com',
      password: '123456',

    };

    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((error, response) => {
        response.should.have.status(201);
        token = response.body.token;
        response.should.be.an('object');
      });
    done();
  });
  it('should NOT POST a new User, validation issue', (done) => {
    const createdUser = {
      fname: 'Uwimana',
      lname: 'Anisie',
      email: 'uwa102gmail.com', // invalid email
      password: '123456',

    };
    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it('should NOT POST a new User, invalid PATH', (done) => {
    const createdUser = {
      fname: 'Uwimana',
      lname: 'Anisie',
      email: 'uwa102@gmail.com',
      password: '123456',

    };
    chai.request(app)
      .post('/api/users/s') // iNVALID PATH
      .send(createdUser)
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
describe('GET /', () => {
  before(async () => {
    await cleanAlltables();
  });
  it('should retunr Get endpoint is working', (done) => {
    chai.request(app)
      .get('/')
      .end(() => {
        done();
      });
  });
});
