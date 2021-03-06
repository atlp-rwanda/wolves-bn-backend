import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
import models from '../src/database/models';

let token;
const { users } = models;
let id;
chai.should();
chai.use(chaiHttp);
const cleanAlltables = async () => {
  await users.destroy({ where: {} });
};

describe('POST /api/users/signup', () => {
  it('should POST a new User', (done) => {
    const createdUser = {
      firstName: 'Uwimana',
      lastName: 'Anisie',
      phone: '0788314143',
      email: 'uwa100@gmail.com',
      password: '123456',
    };

    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((error, response) => {
        response.should.have.status(201);
        token = response.body.token;
        response.should.be.an('object');
        done();
      });
  });
});
it('should NOT POST a new User, validation issue', (done) => {
  const createdUser = {
    firstName: 'Uwimana',
    lastName: 'Anisie',
    phone: '0438848439',
    email: 'uwa100gmail.com', // invalid email
    password: '123456',
  };
  chai.request(app)
    .post('/api/users/signup')
    .send(createdUser)
    .end((error, response) => {
      response.should.have.status(400);
      done();
    });
});
it('should NOT POST a new User, invalid PATH', (done) => {
  const createdUser = {
    firstName: 'Uwimana',
    lastName: 'Anisie',
    email: 'uwa100@gmail.com',
    password: '123456',
  };
  chai.request(app)
    .post('/api/users/s') // iNVALID PATH
    .send(createdUser)
    .end((error, response) => {
      response.should.have.status(404);
      done();
    });
});

describe('GET /', () => {
  it('should return Get endpoint is working', (done) => {
    chai.request(app)
      .get('/')
      .end(() => {
        done();
      });
  });
});

describe('GET /api/profiles/:id', () => {
  it('should return the user', (done) => {
    chai.request(app)
      .get('/api/profiles')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
      });
    done();
  });
});

describe('PUT /api/profiles', () => {
  it('should update the profile of the user', (done) => {
    const userDetails = {
      firstName: 'Crepin',
      lastName: 'Bosco',
      email: 'uwa100@gmail.com',
      photo: ['http://res.cloudinary.com/nosenti/image/upload/v1601503825/k2wvp3mkk9ca0b4ksagg.jpg'],
      address: 'Kacyiru',
      gender: 'Male',
      language: 'French',
      currency: 'RWF',
      department: 'Operations',
    };
    chai.request(app)
      .put('/api/profiles')
      .set('token', token)
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
  it('should not update the profile of the user', (done) => {
    const userDetails = {
      firstName: '',
      lastName: 'Bosco',
      email: 'crepina@test.com',
      photo: ['https://www.google.com/search?q=random+image&tbm=isch&source=iu&ictx=1&fir=w_2Xay2IzNC0zM%252CYpYw_trHdY78IM%252C_&vet=1&usg=AI4_-kTvfEe00igI4nEu3c_MRnLncEGZVA&sa=X&ved=2ahUKEwjJ1J_B2YHsAhV1wuYKHaPyC7gQ9QF6BAgKEEQ#imgrc=w_2Xay2IzNC0zM'],
      address: 'Kacyiru',
      gender: 'Male',
      language: 'French',
      currency: 'RWF',
      role: 'ops manager',
      department: 'Operations',
    };
    chai.request(app)
      .put('/api/profiles')
      .set('token', token)
      .send(userDetails)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
describe('GET /', () => {
  it('should return Get endpoint is working', (done) => {
    chai.request(app)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
