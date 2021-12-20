let router = require('express').Router();
const Subscriptions = require('../../models/Subscription');
const jwt = require('jsonwebtoken');
const verifier = require('../../config').verifier;
const Email = require('../../events/Email');

let emailS = new Email();

emailS.on('sendEmail', emailS.send);

router.post('/create', async (req, res, next) => {

    let { email } = req.body;

    if (!email) {
        return res.status(400).json({
            errors: { email: "cannot be empty" }
        });
    }

    let existing = await Subscriptions.findOne({ email: email });

    if (!existing) {

        let token = jwt.sign({
            email: email,
        }, verifier, { expiresIn: 60 * 60 });

        emailS.queue({
            to: email,
            subject: 'Subscription Email Confirmation',
            text: `Please click the link to verify your email
            ${req.protocol}://${req.get('host')}/api/subscription/confirm?token=${token}`
        });

    } else {

        emailS.queue({ to: email, subject: "Subscription email", text: "You are already our member!" });
    }

    return res.status(200)
        .json({ email: email, message: `Subscription activated` });
});

router.get('/confirm', async (req, res, next) => {
    try {
        let { token } = req.query;
        const token_info = await jwt.verify(token, verifier);

        if (token_info) {

            let subscription = new Subscriptions({
                email: token_info.email,
                is_subscribed: true
            });

            await subscription.save();

        }

        return res.redirect('//www.google.com');

    } catch (error) {
        /* If error for cases like invalid token and any other
           redirect user to front end and show message 
           */
        let front_end_url = process.env.FRONT_END_URL || 'http://localhost:3000';
        return res.redirect(`${front_end_url}/subscription?status=failed&reason=${error.message}`);
    }
});

module.exports = router;