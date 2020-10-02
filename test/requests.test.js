import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';
import {
  managerToken, dummyToken, manager, dummyUser
} from './fixtures/users';

const { trip } = models;
chai.use(chaiHttp);
chai.should();
const managerId = manager.id;
const userId = dummyUser.id;

describe('Testing the get requests routes', () => {
  console.log(managerId);
  it('it should return invalid token', (done) => {
    chai.request(app)
      .get(`/api/manager/trips/${userId}`)
      .set('token', 'adjajd')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('It should return no token provided', (done) => {
    chai.request(app)
      .get(`/api/manager/trips/${userId}`)
      .set('token', '')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('It should return all the trips for the manager', (done) => {
    chai.request(app)
      .get(`/api/manager/trips/${managerId}`)
      .set('token', managerToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});