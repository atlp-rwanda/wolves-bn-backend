import chai, { AssertionError } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import { travelAdminToken, managerToken } from './fixtures/users';

chai.use(chaiHttp);
chai.should();
let token;
let id;
let roomId;
let accId;
let tripId;

describe('Reservation Tests', () => {
  before((done) => {
    const user = {
      firstName: 'Holy',
      lastName: 'Name',
      phone: '0878787878',
      email: 'name@barefoot.com',
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
        email: 'name@barefoot.com',
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
        name: 'Rubavu Hotel',
        locationId: 1,
      })
      .end((err, response) => {
        accId = response.body.data.id;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post(`/api/accommodations/${accId}/rooms`)
      .set('token', `${travelAdminToken}`)
      .send({
        type: 'double room',
        price: 20000
      })
      .end((err, response) => {
        roomId = response.body.id;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .post('/api/trips/')
      .set('token', `${token}`)
      .send({
        from: 4,
        to: 1,
        travel_date: '2020-04-12',
        return_date: '2020-05-12',
        travel_reason: 'New office',
        accommodation: accId
      })
      .end((err, response) => {
        tripId = response.body.id;
        done();
      });
  });
  before((done) => {
    chai
      .request(app)
      .put(`/api/trips/${tripId}`)
      .set('token', `${managerToken}`)
      .send({
        request_status: 'approved'
      })
      .end((err, response) => {
        done();
      });
  });
  // POST RESERVATION
  describe('POST /reservation', () => {
    it('Should reserve room with status code 201', (done) => {
      chai
        .request(app)
        .post('/api/reservations')
        .set('token', `${token}`)
        .send({
          check_in: '2020-11-29',
          check_out: '2020-12-25',
          room_id: roomId
        })
        .end((req, res) => {
          id = res.body.id;
          res.should.have.status(201);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not book a room  when not authorized ', (done) => {
      chai
        .request(app)
        .post('/api/reservations/')
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not book room on invalid token', (done) => {
      chai
        .request(app)
        .post('/api/reservations')
        .set('token', 'invalidtoken')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not book on invalid dates', (done) => {
      chai
        .request(app)
        .post('/api/reservations')
        .set('token', `${token}`)
        .send({
          check_in: '2020-110-29',
          check_out: '2020-120-25',
          room_id: roomId
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not reserve room with chekIn date from the past', (done) => {
      chai
        .request(app)
        .post('/api/reservations')
        .set('token', `${token}`)
        .send({
          check_in: '2020-09-29',
          check_out: '2020-12-25',
          room_id: roomId
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not reserve room with chekout date from the past', (done) => {
      chai
        .request(app)
        .post('/api/reservations')
        .set('token', `${token}`)
        .send({
          check_in: '2020-12-29',
          check_out: '2020-02-25',
          room_id: roomId
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not reserve room with  equivalent dates ', (done) => {
      chai
        .request(app)
        .post('/api/reservations')
        .set('token', `${token}`)
        .send({
          check_in: '2020-12-29',
          check_out: '2020-12-29',
          room_id: roomId
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not reserve room with invalid roomid', (done) => {
      chai
        .request(app)
        .post('/api/reservations')
        .set('token', `${token}`)
        .send({
          check_in: '2020-10-29',
          check_out: '2020-12-25',
          room_id: 0
        })
        .end((req, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          done();
        });
    });
  });
  // GET RESERVATIONS
  describe('GET /reservations', () => {
    it('Should view reservations when authorized', (done) => {
      chai
        .request(app)
        .get('/api/reservations')
        .set('token', `${token}`)
        .end((req, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('Should not find reservations when unthorized', (done) => {
      chai
        .request(app)
        .get('/api/reservations')
        .end((req, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('Should not find reservations on invalid resource', (done) => {
      chai
        .request(app)
        .get('/api/reservation')
        .set('token', `${token}`)
        .end((req, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // UPDATE RESERVATION
  describe('PATCH /reservations', () => {
    it('Should not update reservation when not authorized ', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${id}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update reservation on invalid token', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${id}`)
        .set('token', 'invalidToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update reservation on invalid id', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${0}`)
        .set('token', `${token}`)
        .send({

          check_in: '2021-11-29',
          check_out: '2021-12-25',
          room_id: roomId

        })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update on invalid dates', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${id}`)
        .set('token', `${token}`)
        .send({
          check_in: '2020-110-29',
          check_out: '2020-120-25',
          room_id: roomId
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update with chekIn date from the past', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${id}`)
        .set('token', `${token}`)
        .send({
          check_in: '2020-09-29',
          check_out: '2020-12-25',
          room_id: roomId
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update with chekout date from the past', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${id}`)
        .set('token', `${token}`)
        .send({
          check_in: '2020-12-29',
          check_out: '2020-02-25',
          room_id: roomId
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update with  equivalent dates ', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${id}`)
        .set('token', `${token}`)
        .send({
          check_in: '2020-12-29',
          check_out: '2020-12-29',
          room_id: roomId
        })
        .end((req, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not update with invalid roomid', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${id}`)
        .set('token', `${token}`)
        .send({
          check_in: '2020-10-29',
          check_out: '2020-12-25',
          room_id: 0
        })
        .end((req, res) => {
          res.should.have.status(404);
          res.should.be.a('object');
          done();
        });
    });
    it('Should update a reservation when authorized', (done) => {
      chai
        .request(app)
        .patch(`/api/reservations/${id}`)
        .set('token', `${token}`)
        .send(
          {
            check_in: '2020-12-29',
            check_out: '2021-01-05',
            room_id: roomId
          }
        )
        .end((req, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
  // DELETE RESERVATION
  describe('DELETE /reservations', () => {
    it('Should delete a reservation when authorized', (done) => {
      chai
        .request(app)
        .delete(`/api/reservations/${id}`)
        .set('token', `${token}`)
        .end((req, res) => {
          res.should.have.status(204);
          done();
        });
    });
    it('Should not find a reservation when already deleted', (done) => {
      chai
        .request(app)
        .delete(`/api/reservations/${id}`)
        .set('token', `${token}`)
        .end((req, res) => {
          res.should.have.status(409);
          res.should.be.a('object');
          done();
        });
    });
    it('Should not find a reservation on invalid resource', (done) => {
      chai
        .request(app)
        .delete(`/api/reservations/${0}`)
        .set('token', `${token}`)
        .end((req, res) => {
          res.should.have.status(409);
          res.should.be.a('object');
          done();
        });
    });
  });
});