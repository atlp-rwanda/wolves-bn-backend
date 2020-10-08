import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';
import { travelAdminToken } from './fixtures/users';

const { accomodation } = models;

chai.should();
chai.use(chaiHttp);
let id;
describe('POST /api/accommodations', () => {
  it('should create an accomodation', (done) => {
    const createdAccomodation = {
      name: 'Marriot',
      description: 'Marriot Hotel',
      longitude: '2.456789',
      altitude: '1.234455667',
      images: [],
      facilities: ['Gym', 'Pool']
    };

    chai.request(app)
      .post('/api/accommodations')
      .type('form')
      .set('token', travelAdminToken)
      .send(createdAccomodation)
      .end((error, response) => {
        response.should.have.status(201);
        id = response.body.id;
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
      .put(`/api/accommodations/${id}`)
      .set('token', travelAdminToken)
      .send(createdAccomodation)
      .end((error, response) => {
        response.should.have.status(201);
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
      .put(`/api/accommodations/${id}`)
      .send(createdAccomodation)
      .end((error, response) => {
        response.should.have.status(400);
        done();
      });
  });
});
