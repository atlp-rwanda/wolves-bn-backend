import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Search endpoint', () => {
  it('should return 404 status code when no destination is found', (done) => {
    chai.request(app)
      .get('/trips/search?destination=noPlace')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 ok a destination related search is found successfully', (done) => {
    chai
      .request(app)
      .get('/api/trips/search?destination=Kigali')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 404 status code when no departure place are found', (done) => {
    chai.request(app)
      .get('/api/trips/search?departure=noPlace')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 ok when a departure place is found successfully', (done) => {
    chai
      .request(app)
      .get('/api/trips/search?departure=Kigali')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 200 status code when no related departure city found', (done) => {
    chai.request(app)
      .get('/api/trips/search?destination=Nairobi')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 404 status code when no owner is found', (done) => {
    chai.request(app)
      .get('/trips/search?owner=noUser')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 200 ok a search is carried out successfully', (done) => {
    chai
      .request(app)
      .get('/api/trips/search?owner=Super')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });
});