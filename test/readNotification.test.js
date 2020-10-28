import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { dummyToken, managerToken } from './fixtures/users';

const { expect } = chai;
chai.use(chaiHttp);

describe('read Notifications endpoint', () => {
  it('should return 404 status code when you no notification found', (done) => {
    chai.request(app)
      .get('/api/notifications/markRead/0')
      .set('token', dummyToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 ok a user mark one specific notification as read', (done) => {
    chai
      .request(app)
      .get('/api/notifications/markRead/1')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 200 ok when a user mark all notification as read', (done) => {
    chai
      .request(app)
      .get('/api/notifications/markReadAll/')
      .set('token', managerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
