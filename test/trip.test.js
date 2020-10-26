import chai, { AssertionError } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { travelAdminToken } from './fixtures/users';

chai.use(chaiHttp);
chai.should();
let token;
let id;
let manager_id;
let accId;
let start_time = '2020-01-01';
let end_time = '2022-01-01';

describe('Trip Tests', () => {
  before((done) => {
    const user = {
      firstName: 'Holy',
      lastName: 'Name',
      phone: '0878787878',
      email: 'holygangster@barefoot.com',
      password: '123456'
    };
    chai
      .request(app)
      .post('/api/users/signup')
      .send(user)
      .end((err, response) => {
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'holygangster@barefoot.com',
        password: '123456'
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/api/accommodations/')
      .set('token', `${travelAdminToken}`)
      .send({
        name: 'Hotel Chez Anisie',
        locationId: 1,
      })
      .end((err, response) => {
        accId = response.body.data.id;
        done();
      });
  });

  // POST TRIP
  describe('POST /trip', () => {
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
          travel_reason: 'new office for opening',
          accommodation: accId
        })
        .end((req, res) => {
          id = res.body.id;
          res.should.have.status(201);
          res.should.be.a('object');
          done();
        });
    }); it('Should get stats of trips based on X timeFrame', (done) => {
      start_time = '2020-01-01';
      end_time = '2022-01-01';
      chai
        .request(app)
        .get(`/api/trips/statistics/${start_time}/${end_time}`)
        .set('token', token)
        .end((req, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    }); it('Should NOT GET stats of trips based on INVALID X timeFrame', (done) => {
      start_time = '2020-10-50';// INVALID DATE
      end_time = '2022-01-01';
      chai
        .request(app)
        .get(`/api/trips/statistics/${start_time}/${end_time}`)
        .set('token', token);
      done();
    });
    it('Should get stats of trips based on X timeFrame', (done) => {
      start_time = '2030-10-07';// the start Date should be before End Date
      end_time = '2022-01-01';
      chai
        .request(app)
        .get(`/api/trips/statistics/${start_time}/${end_time}`)
        .set('token', token);
      done();
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
        .set('token', `${token}`)
        .send({
          from: 4,
          to: 1,
          travel_date: '2020-09-30',
          travel_reason: 'new office',
          accommodation: accId
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
        .set('token', `${token}`)
        .send({
          from: 5,
          to: 4,
          travel_date: '2020-9-30',
          return_date: '2020-11-30',
          travel_reason: 'new office',
          accommodation: 1
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
        .set('token', `${token}`)
        .send({
          from: '5',
          to: '',
          travel_date: '2020-9-30',
          return_date: '2020-11-30',
          travel_reason: 'new office',
          accommodation: 1
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
  });
  // DELETE TRIP
  describe('/DELETE Trip', () => {
    it('Should delete a trip when authorized', (done) => {
      chai
        .request(app)
        .delete(`/api/trips/${id}`)
        .set('token', `${token}`)
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
        .set('token', `${token}`)
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
        .set('token', `${token}`)
        .end((req, res) => {
          res.should.have.status(409);
          res.should.be.a('object');
          done();
        });
    });
  });
});