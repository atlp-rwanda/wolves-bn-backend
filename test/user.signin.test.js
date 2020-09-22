/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';

const { expect } = chai;
const { users } = models;
chai.use(chaiHttp);
const cleanAlltables = async () => {
  await users.destroy({ where: {} });
};

export let token;

describe('user login', () => {
  before(async () => {
    await cleanAlltables();
  });
  it('should return 400 bad request status when an invalid email is provided', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'admin@gmai',
        password: '1234567'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 400 bad request status for unregisted user', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'adm@gmail.com',
        password: '1234567'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 400 bad request status when an invalid password is provided', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'any3@gmail.com',
        password: '123'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
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
        response.should.have.status(201);
        token = response.body.token;
        response.should.be.an('object');
        done();
      });
  });
  it('should return 200, ok status and token for a successful user  sign  in', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'uwa102@gmail.com',
        password: '123456'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.have.property('token');
        token = res.body.token;
        done();
      });
  });
});
