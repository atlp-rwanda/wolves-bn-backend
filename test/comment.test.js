import chai from 'chai';
import chaiHTTP from 'chai-http';
import { array } from 'joi';
import app from '../src/index';
import models from '../src/database/models';

let tripId;
let userId;
let token;
let id;
const { users } = models;
chai.should();
chai.use(chaiHTTP);

const cleanAlltables = async () => {
  await users.destroy({ where: {} });
};

describe('Comments and delete', () => {
  before(async () => {
    await cleanAlltables();
  });
  it('should POST a new User', (done) => {
    const createdUser = {
      firstName: 'Normal',
      lastName: 'User',
      phone: '0788314143',
      email: 'test@gmail.com',
      password: '123456',
    };
    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((error, response) => {
        response.should.have.status(201);
        done();
      });
  });
  it('should return 200, ok status and token for a successful user sign in', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@gmail.com',
        password: '123456'
      })
      .end((err, res) => {
        const ids = res.body.user.id;
        userId = ids;
        token = res.body.token; // save the token!
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
  it('Should post a trip with status code 201', (done) => {
    chai
      .request(app)
      .post('/api/trips')
      .set('token', token)
      .send({
        from: 4,
        to: 2,
        travel_date: '2020-9-30',
        return_date: '2020-11-30',
        travel_reason: 'new office'
      })
      .end((req, res) => {
        const ids = res.body.id;
        tripId = ids;
        res.should.have.status(201);
        res.should.be.an('object');
        done();
      });
  });
  it('It should return 201 when comment is created', (done) => {
    const requestBody = {
      comment: 'comment from Requester: test@gmail.com'
    };
    console.log(requestBody);
    chai.request(app)
      .post(`/api/trips/${tripId}/comment`)
      .set('token', token)
      .send(requestBody)
      .end((err, res) => {
        tripId = res.body.saveComment.id;
        console.log(`this is trip id from comments ${tripId}`);
        res.should.have.status(201);
        done();
      });
  });
  it('should return all comments related to that trip', (done) => {
    chai.request(app)
      .get(`/api/trips/${id}/comments/${tripId}`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an(array);
        done();
      });
    done();
  });
  it('should return 404 is no data found', (done) => {
    chai.request(app)
      .get(`/api/trips/${userId}/comments/${tripId}`)// user id is not the correct tripId
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('It should return 200 when comment is deleted', (done) => {
    chai.request(app)
      .delete(`/api/trips/${tripId}/comments`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  }); it('It should return 404 when comment not found, already deleted', (done) => {
    chai.request(app)
      .delete(`/api/trips/${tripId}/comments`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('It should return invalid inputs', (done) => {
    const requestBody = {
      userId,
      tripId,
      comment: '',
    };
    chai.request(app)
      .post(`/api/trips/${tripId}/comment`)
      .set('token', token)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('It should return not found', (done) => {
    chai.request(app)
      .get(`/api/trips/${tripId}/comments/0`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('It should return invalid token', (done) => {
    const requestBody = {
      userId,
      tripId,
      comment: 'comment from Manager',
    };
    chai.request(app)
      .post(`/api/trips/${tripId}/comment`)
      .set('token', 'jsjjska')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('It should return no token provided', (done) => {
    const requestBody = {
      userId,
      tripId,
      comment: 'comment from Manager',
    };
    chai.request(app)
      .post(`/api/trips/${tripId}/comment`)
      .set('token', '')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});