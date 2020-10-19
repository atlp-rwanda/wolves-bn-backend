import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { dummyToken } from './fixtures/users';

const { expect } = chai;
chai.use(chaiHttp);

describe('Feedback endpoint', () => {
  it('should return 404 status code when accommodation passed is not found', (done) => {
    chai.request(app)
      .post('/api/accommodation/0/feedback')
      .set('token', dummyToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 ok when a feedback is posted successfully', (done) => {
    chai
      .request(app)
      .post('/api/accommodation/1/feedback')
      .send({ message: 'this is a feedback' })
      .set('token', dummyToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
