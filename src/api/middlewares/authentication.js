const passport = require('passport');
const passportJWT = require('passport-jwt');
const { Users, Drivers } = require('../../models');

passport.use(
  'user',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: 'RANDOM_STRING',
    },
    async (payload, done) => {
      const user = await Users.findOne({ email: payload.email });
      return user ? done(null, user) : done(null, false);
    }
  )
);

passport.use(
  'driver',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: 'RANDOM_STRING',
    },
    async (payload, done) => {
      const driver = await Drivers.findOne({ email: payload.email });
      return driver ? done(null, driver) : done(null, false);
    }
  )
);

module.exports = {
  authMiddleware: passport.authenticate('user', { session: false }),
  authMidDriver: passport.authenticate('driver', { session: false }),
};