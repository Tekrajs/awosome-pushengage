require('dotenv').config();
let app = require('express')(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors');

let isProduction = process.env.SERVER === 'production';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/awosome');

require('./config/passport');
app.use(require('./routes'));

app.use(function (err, req, res, next) {
    if (err) {
        console.log(err);
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: {}
            }
        });
    }
});

let server = app.listen(process.env.PORT || 8000, function () {
    console.log('server is listening on ' + server.address().port);
});