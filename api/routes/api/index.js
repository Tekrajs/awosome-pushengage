let router = require('express').Router();

router.use(require('./users'));
router.use(require('./blogs'));

router.use(function (err, req, res, next) {

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            errors: { code: err.code, message: err.message }
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function (errors, key) {
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        });

    }


    return res.status(500).json({ code: err.code, message: err.message });

});

module.exports = router;