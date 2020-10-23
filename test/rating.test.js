import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { dummyToken } from './fixtures/users';

const { expect } = chai;
chai.use(chaiHttp);

describe('like endpoint', () => {
  it('should return 404 status code when accommodation passed is not found', (done) => {
    chai.request(app)
      .post('/api/accommodation/0/rating')
      .set('token', dummyToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 ok when an accommodation is liked successfully', (done) => {
    chai
      .request(app)
      .post('/api/accommodation/1/rating')
      .set('token', dummyToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 200 ok code when an accommodation is unLiked successfully', (done) => {
    chai.request(app)
      .post('/api/accommodation/1/rating')
      .set('token', dummyToken)
      .send({ rating: '4.5' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
