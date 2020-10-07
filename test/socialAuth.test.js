import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import httpMocks from 'node-mocks-http';
import authUser from '../src/controllers/userAuth';

chai.should();
chai.use(chaiHttp);
describe('testing auth endpoint', () => {
  it('should return 200 on success', async () => {
    const request = httpMocks.createRequest({
      user: {
        provider: 'facebook',
        name: {
          familyName: 'Ndkubwayo',
          givenName: 'Cherubin',
        },
        emails: [
          {
            value: 'cherubinkubwayo@gmail.com',
          },
        ],
        id: '234235asdkjfjlklsdfk',
      },
    });

    const res = httpMocks.createResponse();
    await authUser.authUser(request, res);
    res.statusCode.should.be.equal(200);
    res.should.have.be.an('object');
  });
  it('should return 200 on success', async () => {
    const request = httpMocks.createRequest({
      user: {
        provider: 'google',
        name: {
          familyName: 'Ndkubwayo',
          givenName: 'Cherubin',
        },
        emails: [
          {
            value: 'cherubinkubwayo@gmail.com',
          },
        ],
        id: '234235asdkjfjlklsdfk',
      },
    });

    const res = httpMocks.createResponse();
    await authUser.authUser(request, res);

    res.statusCode.should.be.equal(200);
    res.should.have.be.an('object');
  });
});
