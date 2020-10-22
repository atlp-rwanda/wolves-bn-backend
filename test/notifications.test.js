import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { dummyToken } from './fixtures/users';

chai.should();
chai.use(chaiHttp);

describe('Testing Notifications', () => {
  it('It should get all the notifications', (done) => {
    chai.request(app)
      .get('/api/notifications')
      .set('token', dummyToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});