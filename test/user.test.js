import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';

let token;
const { users } = models;
chai.should();
chai.use(chaiHttp);
const cleanAlltables = async () => {
  await users.destroy({ where: {} });
};

describe('POST /api/users/signup', () => {
  before(async () => {
    await cleanAlltables();
  });
  it('should POST a new User', (done) => {
    const createdUser = {
      firstName: 'Uwimana',
      lastName: 'Anisie',
      phone: '0788314143',
      email: 'uwa102@gmail.com',
      password: '123456',

    };

    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((error, response) => {
        response.should.have.status(200);
        token = response.body.token;
        response.should.be.an('object');
        done();
      });
  });

  it('should NOT POST a new User, validation issue', (done) => {
    const createdUser = {
      firstName: 'Uwimana',
      lastName: 'Anisie',
      phone: '0438848439',
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
      firstName: 'Uwimana',
      lastName: 'Anisie',
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
      .end((error, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
