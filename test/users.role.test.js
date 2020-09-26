import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';
import { superAdminToken, requesterToken } from './fixtures/users';

const { users } = models;
chai.should();
chai.use(chaiHTTP);

const cleanAlltables = async () => {
  await users.destroy({ where: {} });
};

describe('Changing the users roles', () => {
  before(async () => {
    await cleanAlltables();
  });
  it('should POST a new User', (done) => {
    const createdUser = {
      firstName: 'super',
      lastName: 'admin',
      phone: '0788314183',
      email: 'anisieuwimana12@barefoot.com',
      password: '123456',
    };
    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((error, response) => {
        response.should.have.status(201);
      });
    done();
  });
  it('should return 200, ok status and token for a successful user  sign  in', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'anisieuwimana12@barefoot.com',
        password: '123456'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
  it('It should return role successfully updated', (done) => {
    const requestBody = {
      userEmail: 'anisieuwimana12@barefoot.com',
      userRole: 'manager'
    };
    chai.request(app)
      .patch('/api/users/settings')
      .set('token', superAdminToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('It should return invalid inputs', (done) => {
    const requestBody = {
      userEmail: 'invamsad asjkda',
      userRole: 'jdksjaa'
    };
    chai.request(app)
      .patch('/api/users/settings')
      .set('token', superAdminToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('It should return user not found', (done) => {
    const requestBody = {
      userEmail: 'manager@barefoot.com',
      userRole: 'requester'
    };
    chai.request(app)
      .patch('/api/users/settings')
      .set('token', superAdminToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('It should return invalid token', (done) => {
    const requestBody = {
      userEmail: 'anisieuwimana12@barefoot.com',
      userRole: '123456'
    };
    chai.request(app)
      .patch('/api/users/settings')
      .set('token', 'jsjjska')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('It should return user not super admin', (done) => {
    const requestBody = {
      userEmail: 'anisieuwimana12@barefoot.com',
      userRole: 'requester'
    };
    chai.request(app)
      .patch('/api/users/settings')
      .set('token', requesterToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
  it('It should return no token provided', (done) => {
    const requestBody = {
      userEmail: 'anisieuwimana12@barefoot.com',
      userRole: '123456'
    };
    chai.request(app)
      .patch('/api/users/settings')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});