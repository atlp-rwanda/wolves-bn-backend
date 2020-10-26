const jwtAuth = require('socketio-jwt-auth');

export default jwtAuth.authenticate({
  secret: process.env.SECRET_OR_KEY,
  // algorithm: 'HS256'
}, (payload, done) => {
  done(null, payload);
});