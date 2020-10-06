import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';
import { managerToken } from './fixtures/users';

const { users } = models;
let token;
let manager_id;
let requester_id;
let id;
let usertoken;

chai.use(chaiHttp);
chai.should();
const cleanAlltables = async () => {
  await users.destroy({ where: {} });
};

describe('POST /trip', () => {
  before(async () => {
    await cleanAlltables();
  });
  it('It ahould sign up a new user', (done) => {
    const createdUser = {
      firstName: 'safi',
      lastName: 'madiba',
      phone: '0788888888',
      email: 'safimadiba@gmail.com',
      password: '123456',
    };
    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((req, res) => {
        res.should.have.status(201);
        usertoken = res.body.token;
        done();
      });
  });
  it('It should sign in the user', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'safimadiba@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });
  it('Should post a trip with status code 201', (done) => {
    chai
      .request(app)
      .post('/api/trips')
      .set('token', token)
      .send(
        {
          from: 5,
          to: 1,
          travel_date: '2020-9-30',
          return_date: '2020-11-30',
          travel_reason: 'new office'
        })
      .end((req, res) => {
        id = res.body.id;
        requester_id = res.body.requester_id;
        manager_id = res.body.manager_id;
        res.should.have.status(201);
        res.should.be.a('object');
        done();
      });
  });
  it('It should return trip requests made by the user', (done) => {
    chai.request(app)
      .get('/api/trips')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('It should return trip requests for the manager', (done) => {
    chai.request(app)
      .get('/api/trips')
      .set('token', managerToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('Testing the get requests routes', () => {
  it('it should return invalid token', (done) => {
    chai.request(app)
      .get('/api/trips')
      .set('token', 'adjajd')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('it should return invalid token', (done) => {
    chai.request(app)
      .get('/api/trips')
      .set('token', 'adjajd')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('It should return no token provided', (done) => {
    chai.request(app)
      .get('/api/trips')
      .set('token', '')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('It should return no token provided', (done) => {
    chai.request(app)
      .get('/api/trips')
      .set('token', '')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});