import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';
import { superAdminToken, requesterToken } from './fixtures/users';

const { accomodation } = models;
let id;
chai.should();
chai.use(chaiHttp);

describe('POST /api/accommodations', () => {
  it('should POST a new User', (done) => {
    const createdUser = {
      firstName: 'rukundo',
      lastName: 'arcene',
      phone: '0788314183',
      email: 'manager1@gmail.com',
      password: '123456',
    };
    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((error, response) => {
        response.should.have.status(201);
      });
    done();
  });
  it('should return 200, ok status and token for a successful user  sign  in', (done) => {
    chai
      .request(app)
      .post('/api/users/signin')
      .send({
        email: 'manager1@gmail.com',
        password: '123456'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
  it('It should return role successfully updated', (done) => {
    const requestBody = {
      userEmail: 'manager1@gmail.com',
      userRole: 'manager'
    };
    chai.request(app)
      .patch('/api/users/settings')
      .set('token', superAdminToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('should create an accomodation', (done) => {
    const createdAccomodation = {
      name: 'Marriot',
      description: 'Marriot Hotel',
      longitude: '2.456789',
      altitude: '1.234455667',
      images: ['http://res.cloudinary.com/nosenti/image/upload/v1601503825/k2wvp3mkk9ca0b4ksagg.jpg', 'http://res.cloudinary.com/nosenti/image/upload/v1601503823/pezmtvvlcgflcdvx3hx1.png', 'http://res.cloudinary.com/nosenti/image/upload/v1601503824/adv2zbjmjc7xtot3ejyh.png'],
      facilities: ['Gym', 'Pool']
    };

    chai.request(app)
      .post('/api/accommodations')
      .send(createdAccomodation)
      .end((error, response) => {
        response.should.have.status(201);
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
