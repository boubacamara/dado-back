const { createTransport } = require('nodemailer');
const {SMTP_AUTH_USER, SMTP_AUTH_PASS} = process.env

const mailNotification = async ({ to, subject, html}) => {
       const transport = createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: SMTP_AUTH_USER,
                pass: SMTP_AUTH_PASS
            }
       });
       
       return await transport.sendMail({
        from: '"Galadio Ganega" <boubaprogrammer@gmail.com>',
        to,

        subject,
        html
       })
}

module.exports = {
    mailNotification
}