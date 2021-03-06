/* eslint-disable func-names, prefer-arrow-callback */

const request = require('supertest');
const app = require('../../server/app.js');
const dbUtils = require('../lib/dbUtils.js');

describe('Profiles API', function () {
  beforeEach(function () {
    return dbUtils.reinitialize();
  });

//   xit('accepts GET requests to /api/profiles', function (done) {
//     request(app)
//       .get('/api/profiles')
//       .expect((res) => {
//         res.body = {
//           length: res.body.length,
//         };
//       })
//       .expect(200, {
//         length: 1,
//       })
//       .end(done);
//   });

//   xit('accepts GET requests to /api/profiles/:id', function (done) {
//     request(app)
//       .get('/api/profiles/1')
//       .expect((res) => {
//         res.body = {
//           id: res.body.id,
//           created_at: !!Date.parse(res.body.created_at),
//         };
//       })
//       .expect(200, {
//         id: 1,
//         created_at: true,
//       })
//       .end(done);
//   });

//   it('sends 404 if id on GET requests to /api/profiles/:id does not exist', function (done) {
//     request(app)
//       .get('/api/profiles/123')
//       .expect(404)
//       .end(done);
//   });

  // it('accepts POST requests to /api/profiles', function (done) {
  //   request(app)
  //     .post('/api/profiles')
  //     .send({
  //       username: 'TestUser4',
  //       password: 'happy'
  //     })
  //     .expect((res) => {
  //       res.body = {
  //         username: res.body.username,
  //         password: res.body.password
  //       };
  //     })
  //     .expect(201, {
  //       username: 'TestUser4',
  //       password: undefined
  //     })
  //     .end(done);
  // });

  xit('accepts PUT requests to /api/profiles/:id', function () {
    const profile = {
      first: 'James',
      last: 'Davenport',
      display: 'James Davenport',
      email: 'example@email.com',
      phone: '415-555-1234',
    };

    return request(app)
      .put('/api/profiles/1')
      .send(profile)
      .expect(201)
      .then(() => (
        request(app)
          .get('/api/profiles/1')
          .expect((res) => {
            res.body = {
              first: res.body.first,
              last: res.body.last,
              display: res.body.display,
              email: res.body.email,
              phone: res.body.phone,
            };
          })
          .expect(200, profile)
      ));
  });

  xit('sends 404 if id on PUT requests to /api/profiles/:id does not exist', function (done) {
    request(app)
      .put('/api/profiles/123')
      .expect(404)
      .end(done);
  });

  // it('accepts DELETE requests to /api/profiles/:id', function (done) {
  //   request(app)
  //     .delete('/api/profiles/1')
  //     .expect(200)
  //     .end(done);
  // });

  // it('sends 404 if id on DELETE requests to /api/profiles/:id does not exist', function (done) {
  //   request(app)
  //     .delete('/api/profiles/123')
  //     .expect(404)
  //     .end(done);
  // });
});
