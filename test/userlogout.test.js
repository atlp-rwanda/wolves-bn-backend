/* eslint-disable no-undef */
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
chai.use(chaiHttp);

const testUserInfo = {
  firstName: 'Uwimana',
  lastName: 'Anisie',
  email: 'anie@gmail.com',
  password: '123456',
};

let token;

describe('user logout', () => {
  before(async () => {
    const testUser = await models.users.findOne({ where: { email: testUserInfo.email } });
    if (testUser) {
      console.log('Delete test User');
      await testUser.destroy();
    }
  });

  it('should return 200, ok status and token for a successful user  sign up', (done) => {
    chai.request(app)
      .post('/api/users/signup')
      .send(testUserInfo)
      .end((error, res) => {
        res.should.have.status(201);
        token = res.body.token;
        done();
      });
  });

  it('should return 500 bad request status when an invalid token is provided', (done) => {
    chai
      .request(app)
      .get('/api/users/logout')
      .set('token', 'badtoken')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('should return 401 bad request status for unrecognized user', (done) => {
    chai
      .request(app)
      .get('/api/users/logout')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return 200, ok status and token for a successful user log out', (done) => {
    chai
      .request(app)
      .get('/api/users/logout')
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 401 bad request status for who is arleady logged out', (done) => {
    chai
      .request(app)
      .get('/api/users/logout')
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
export default token;
