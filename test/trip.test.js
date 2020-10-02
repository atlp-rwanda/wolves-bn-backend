/* eslint-disable camelcase */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
chai.should();

let token;
let id;
let requester_id;
let manager_id;
describe('signUp', () => {
  before((done) => {
    const createdUser = {
      firstName: 'Holy',
      lastName: 'Name',
      phone: '0788888888',
      email: 'name@gmail.com',
      password: '123456',
    };

    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((req, res) => {
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'name@gmail.com',
        password: '123456',
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });
  // POST TRIP
  describe('POST /trip', () => {
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
          id = res.body.id;
          requester_id = res.body.requester_id;
          manager_id = res.body.manager_id;
          res.should.have.status(201);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not post a trip on when not authorized ', (done) => {
      chai
        .request(app)
        .post('/api/trips/')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not post a trip on invalid token', (done) => {
      chai
        .request(app)
        .post('/api/trips')
        .set('token', 'invalidtoken')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a('object');
          done();
        });
    });
  });
  // UPDATE TRIP
  describe('PATCH /trip', () => {
    it('Should update a trip when authorized', (done) => {
      chai
        .request(app)
        .patch(`/api/trips/${id}`)
        .set('token', token)
        .send({
          from: 5,
          to: 4,
          travel_date: '2020-9-30',
          return_date: '2020-11-30',
          travel_reason: 'new office'
        })
        .end((req, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update a trip when not authorized ', (done) => {
      chai
        .request(app)
        .patch(`/api/trips/${id}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update a trip on invalid token', (done) => {
      chai
        .request(app)
        .patch(`/api/trips/${id}`)
        .set('token', 'invalidToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update a trip on invalid id', (done) => {
      chai
        .request(app)
        .patch('/api/trips/0')
        .set('token', token)
        .send({
          from: 5,
          to: 4,
          travel_date: '2020-9-30',
          return_date: '2020-11-30',
          travel_reason: 'new office'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update a trip on invalid field', (done) => {
      chai
        .request(app)
        .patch(`/api/trips/${id}`)
        .set('token', token)
        .send({
          from: '5',
          to: '',
          travel_date: '2020-9-30',
          return_date: '2020-11-30',
          travel_reason: 'new office'
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
  });
  // DELETE TRIP
  describe('DELETE /trip', () => {
    it('Should delete a trip when authorized', (done) => {
      chai
        .request(app)
        .delete(`/api/trips/${id}`)
        .set('token', token)
        .end((req, res) => {
          res.should.have.status(201);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not find a trip when already deleted', (done) => {
      chai
        .request(app)
        .delete(`/api/trips/${id}`)
        .set('token', token)
        .end((req, res) => {
          res.should.have.status(409);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not find a trip on invalid resource', (done) => {
      chai
        .request(app)
        .delete(`/api/trips/${0}`)
        .set('token', token)
        .end((req, res) => {
          res.should.have.status(409);
          res.should.be.a('object');
          done();
        });
    });
  });
});
