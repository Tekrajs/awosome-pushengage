let router = require('express').Router();
let auth = require('../middleware/auth'),
    passport = require('passport'),
    User = require('../../models/User');

router.get('/user', auth.required, async function (req, res, next) {
    let user = await User.findById(req.payload.id)
        .catch(next);

    if (!user) {
        return res.status(401);
    }

    return res.status(200).json({ user: user.toAuthJSON() });
});

router.post('/users/login', function (req, res, next) {

    if (!req.body.user.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
    }

    passport.authenticate('api-stratey', { session: false }, function (err, user, info) {
        if (err) { return next(err); }

        if (user) {
            user.token = user.generateToken();
            return res.json({ user: user.toAuthJSON() });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);

});

router.post('/users', async function (req, res, next) {
    try {
        let user = new User();
        console.log(req.body.user);
        user.username = req.body.user.username;
        user.email = req.body.user.email;
        user.setPassword(req.body.user.password);
        user.save()
            .then(function () {
                return res.json({ user: user.toAuthJSON() });
            }).catch(next);

    } catch (error) {
        next;
    }
});

module.exports = router;