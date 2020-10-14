import chai from 'chai';
import chaiHTTP from 'chai-http';
import { array } from 'joi';
import app from '../src/index';
import models from '../src/database/models';
import { dummyToken, travelAdminToken } from './fixtures/users';

let tripId;
let userId;
let accId;
let manager_id;
let token;
let commentId;
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
  before((done) => {
    const user = {
      firstName: 'Holy',
      lastName: 'Name',
      phone: '0878787878',
      email: 'holyghost@barefoot.com',
      password: '123456'
    };
    chai
      .request(app)
      .post('/api/users/signup')
      .send(user)
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/api/accommodations')
      .set('token', `${travelAdminToken}`)
      .send({
        name: 'Serena Hotels',
        locationId: 1,
      })
      .end((err, response) => {
        accId = response.body.data.id;
        done();
      });
  });
  it('Should post a trip with status code 201', (done) => {
    chai
      .request(app)
      .post('/api/trips')
      .set('token', `${token}`)
      .send({
        requester_id: id,
        manager_id,
        from: 4,
        to: 1,
        travel_date: '2020-09-30',
        return_date: '2020-11-30',
        travel_reason: 'new office',
        accommodation: accId
      })
      .end((req, res) => {
        id = res.body.id;
        res.should.have.status(201);
        res.should.be.a('object');
        done();
      });
  });
  it('It should return 201 when comment is created', (done) => {
    const requestBody = {
      comment: 'comment from Requester: test@gmail.com'
    };
    chai.request(app)
      .post(`/api/trips/${id}/comment`)
      .set('token', token)
      .send(requestBody)
      .end((err, res) => {
        commentId = res.body.saveComment.id;
        tripId = res.body.saveComment.tripId;
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
        done();
      });
  });
  it('should return 404 is no data found', (done) => {
    chai.request(app)
      .get(`/api/trips/${userId}/comments/${tripId}`)// user id is not the correct tripId
      .set('token', dummyToken)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });
  it('It should return 204 when comment is deleted', (done) => {
    chai.request(app)
      .delete(`/api/trips/${tripId}/comments/${commentId}`)
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('It should return 404 when comment not found, already deleted', (done) => {
    chai.request(app)
      .delete(`/api/trips/${tripId}/comments${commentId}`)
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