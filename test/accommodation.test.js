/* eslint-disable import/prefer-default-export */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';
import { travelAdminToken } from './fixtures/users';
import { userValidate } from '../src/validators/userValidation';

const { accomodation } = models;

chai.should();
chai.use(chaiHttp);
let acc_id;
let room_id;
describe('POST /api/accommodations', () => {
  it('should create an accomodation', (done) => {
    const createdAccomodation = {
      name: 'Marriot',
      description: 'Marriot Hotel',
      longitude: '2.456789',
      altitude: '1.234455667',
      photo: [],
      facilities: ['Gym', 'Pool']
    };

    chai.request(app)
      .post('/api/accommodations')
      .set('token', travelAdminToken)
      .send(createdAccomodation)
      .end((error, response) => {
        response.should.have.status(201);
        acc_id = response.body.data.id;
        done();
      });
  });

  it('should NOT POST an accommodation', (done) => {
    const createdAccomodation = {
      name: 'Marriot',
      description: 'Marriot Hotel',
      longitude: '2.456789',
      altitude: '1.234455667',
      images: 'hello there',
      facilities: ['Gym', 'Pool']

    };
    chai.request(app)
      .post('/api/accommodations')
      .send(createdAccomodation)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });
});
describe('PUT /api/accommodations/:id', () => {
  it('should update an accomodation', (done) => {
    const createdAccomodation = {
      name: 'Marriot',
      description: 'Marriot Hotel',
      longitude: '2.456789',
      altitude: '1.234455667',
      images: ['http://res.cloudinary.com/nosenti/image/upload/v1601503825/k2wvp3mkk9ca0b4ksagg.jpg', 'http://res.cloudinary.com/nosenti/image/upload/v1601503823/pezmtvvlcgflcdvx3hx1.png', 'http://res.cloudinary.com/nosenti/image/upload/v1601503824/adv2zbjmjc7xtot3ejyh.png'],
      facilities: ['Gym', 'Pool']
    };
    chai.request(app)
      .put(`/api/accommodations/${acc_id}`)
      .set('token', travelAdminToken)
      .send(createdAccomodation)
      .end((error, response) => {
        response.should.have.status(200);
      });
    done();
  });

  it('should NOT update an accommodation', (done) => {
    const createdAccomodation = {
      name: 'Marriot',
      description: 'Marriot Hotel',
      longitude: '2.456789',
      altitude: '1.234455667',
      images: 'hello there',
      facilities: ['Gym', 'Pool']

    };
    chai.request(app)
      .put(`/api/accommodations/${acc_id}`)
      .send(createdAccomodation)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });
});
describe('GET /api/accommodations', () => {
  it('should get a list of accomodations', (done) => {
    chai.request(app)
      .get('/api/accommodations')
      .set('token', travelAdminToken)
      .end((error, response) => {
        response.should.have.status(200);
      });
    done();
  });
});
describe('POST /api/accommodations/:acc_id/rooms', () => {
  it('should create a room', (done) => {
    const createdRoom = {
      type: 'King',
      price: 300,
      accomodationId: acc_id,
      images: ['http://res.cloudinary.com/nosenti/image/upload/v1601503825/k2wvp3mkk9ca0b4ksagg.jpg', 'http://res.cloudinary.com/nosenti/image/upload/v1601503823/pezmtvvlcgflcdvx3hx1.png', 'http://res.cloudinary.com/nosenti/image/upload/v1601503824/adv2zbjmjc7xtot3ejyh.png']
    };
    chai.request(app)
      .post(`/api/accommodations/${acc_id}/rooms`)
      .set('token', travelAdminToken)
      .send(createdRoom)
      .end((error, response) => {
        response.should.have.status(201);
        room_id = response.body.id;
        done();
      });
  });

  it('should NOT CREATE a room', (done) => {
    const createdRoom = {
      type: 'King',
      prices: 300,
      accomodationId: acc_id,
      images: ['http://res.cloudinary.com/nosenti/image/upload/v1601503825/k2wvp3mkk9ca0b4ksagg.jpg', 'http://res.cloudinary.com/nosenti/image/upload/v1601503823/pezmtvvlcgflcdvx3hx1.png', 'http://res.cloudinary.com/nosenti/image/upload/v1601503824/adv2zbjmjc7xtot3ejyh.png'],
      facilities: ['Gym', 'Pool']
    };
    chai.request(app)
      .post(`/api/accommodations/${acc_id}/rooms`)
      .send(createdRoom)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });
});

describe('DELETE /api/accommodations/:acc_id/rooms/:room_id', () => {
  it('should delete a room', (done) => {
    chai.request(app)
      .delete(`/api/accommodations/${acc_id}/rooms/${room_id}`)
      .type('form')
      .set('token', travelAdminToken)

      .end((error, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('should NOT delete a room', (done) => {
    chai.request(app)
      .delete(`/api/accommodations/${acc_id}/rooms/${room_id}`)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });
});

describe('DELETE /api/accommodations/:id', () => {
  it('should delete an accomodation', (done) => {
    chai.request(app)
      .delete(`/api/accommodations/${acc_id}`)
      .set('token', travelAdminToken)
      .end((error, response) => {
        response.should.have.status(200);
      });
    done();
  });

  it('should NOT delete an accommodation', (done) => {
    chai.request(app)
      .delete(`/api/accommodation/${acc_id}`)
      .set('token', travelAdminToken)
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
