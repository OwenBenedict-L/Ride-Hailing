const passport = require('passport');
const passportJWT = require('passport-jwt');

const { Drivers } = require('../../models');

passport.use(
  'driver',
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      secretOrKey: 'RANDOM_STRING',
    },
    async (payload, done) => {
      const driver = await Drivers.findOne({ email: payload.email });

      if (!driver) {
        return done(null, false);
      }

      return done(null, driver);
    }
  )
);

module.exports = passport.authenticate('driver', { session: false });