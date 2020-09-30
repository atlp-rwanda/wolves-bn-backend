import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';
import { requesterToken, dummyToken } from './fixtures/users';

const { trip } = models;
chai.use(chaiHttp);
chai.should();
const reqToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrd2l6ZXJhc2V0aEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJrd2l6ZXJhIiwibGFzdE5hbWUiOiJzZXRoIiwicm9sZSI6InJlcXVlc3RlciIsImlhdCI6MTYwMTQ4MDk3OCwiZXhwIjoxNjAxNTY3Mzc4fQ.koO7s0uu9zhvMIQFxX3OX8bitz2FubUOaqlIloevAmw';

describe('Testing the get requests routes', () => {
  it('it should return invalid token', (done) => {
    chai.request(app)
      .get('/api/manager/requests/4')
      .set('token', 'adjajd')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('It should return no token provided', (done) => {
    chai.request(app)
      .get('/api/manager/requests/4')
      .set('token', '')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('It should return user not manager', (done) => {
    chai.request(app)
      .get('/api/manager/requests/4')
      .set('token', reqToken)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});