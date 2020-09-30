// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../src/index';
// import models from '../src/database/models';

// let token;
// let email;
// const { users } = models;
// chai.should();
// chai.use(chaiHttp);
// const cleanAlltables = async () => {
//   await users.destroy({ where: {} });
// };

// describe('POST /api/users/signup', () => {
//   before(async () => {
//     await cleanAlltables();
//   });
//   it('should receive a message', (done) => {
//     const createdUser = {
//       firstName: 'HumanBeing',
//       lastName: 'Anisieshere',
//       email: 'theoneste99@gmail.com',
//       password: '123456',

//     };
//     chai.request(app)
//       .post('/api/users/signup')
//       .send(createdUser)
//       .end((error, response) => {
//         email = response.body.user.email;
//         console.log(response.body.user.email);
//         response.should.have.status(201);
//         token = response.body.token;
//         response.should.be.an('object');
//         done();
//       });
//   });
// });

// describe('/user/confirmation/:email', () => {
//   before(async () => {
//   });
//   it('should update to a user', (done) => {
//     chai.request(app)
//       .get(`/user/confirmation/${email}`)
//       .end((error, response) => {
//         response.should.have.status(200);
//         done();
//       });
//   });

//   it('should not confirm due  to , invalid PATH', (done) => {
//     chai.request(app)
//       .get('/user/confirmation/here') // iNVALID PATH
//       .end((error, response) => {
//         response.should.have.status(404);
//         done();
//       });
//   });
// });
