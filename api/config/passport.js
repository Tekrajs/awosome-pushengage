let passport = require('passport'),
    Strategy = require('passport-local').Strategy,
    User = require('../models/User');

passport.use('api-stratey', new Strategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, async function (email, password, done) {
    let user = await User.findOne({ email: email }).catch(done);
    if (!user || !user.validPassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }
    return done(null, user);
}));
