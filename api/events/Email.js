const EventEmitter = require('events');
const nodemailer = require('nodemailer');

class Email extends EventEmitter {

    queue(args) {
        this.emit('sendEmail', args);
    }


    async send(data) {

        let transporter = nodemailer.createTransport({
            host: process.env.mail_host || "smtp.googlemail.com",
            port: process.env.mail_port || 465,
            secure: process.env.mail_secure || true,
            auth: {
                user: process.env.mail_user || 'ayesha.stha40@gmail.com',
                pass: process.env.mail_password || 'dieqdorxvnseybrg'
            }
        });

        try {

            let info = await transporter.sendMail({
                from: "Subscription 👻 <subscription@example.com>",
                to: data.to + (process.env.SERVER === 'development' ? ',shrestharj64@gmail.com' : ''),
                subject: data.subject,
                text: data.text,
                html: data.html
            });

            return info;

        } catch (error) {

            if (process.env.NODE_ENV !== 'production') {
                console.log(error.message);
            }

            return error;

        }

    }
}

module.exports = Email;
