import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';

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
  it('It should return role successfully updated', (done) => {
    const requestBody = {
      userEmail: 'sometrue@gmail.com',
      userRole: 'manager'
    };
    chai.request(app)
      .patch('/api/users/admin/settings')
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
      .patch('/api/users/admin/settings')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('It should return user is super admin', (done) => {
    const requestBody = {
      userEmail: 'someemail@gmail.com',
      userRole: 'super_admin'
    };
    chai.request(app)
      .patch('/api/users/admin/settings')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
