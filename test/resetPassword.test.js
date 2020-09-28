import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const { expect } = chai;
chai.use(chaiHttp);

describe('forgotPassword endpoint', () => {
  it('should create a user first', (done) => {
    const createdUser = {
      firstName: 'carter',
      lastName: 'pappy',
      phone: '0788314143',
      email: 'pappycarter1@gmail.com',
      password: '123456',
    };

    chai.request(app)
      .post('/api/users/signup')
      .send(createdUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return 404 not found code when account is not found', (done) => {
    chai
      .request(app)
      .post('/api/users/forgotPassword/')
      .send({ email: 'invalid@email.com' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.have.property('Error');
        done();
      });
  });

  it('should return 200 ok status code when an email is sent successfully', (done) => {
    chai
      .request(app)
      .post('/api/users/forgotPassword/')
      .send({ email: 'pappycarter1@gmail.com' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.have.property('Message');
        done();
      });
  });
});

describe('reset Password endpoint', () => {
  it('should return 401 on wrong reset password link', (done) => {
    chai
      .request(app)
      .post('/api/users/resetPassword/sassf32332efwfdsfsdfewwe3244$#@#efwerewrrewr')
      .send({ newPassword: 'newPassword' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.have.property('Error');
        done();
      });
  });
});
