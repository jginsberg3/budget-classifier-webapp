const sgMail = require('@sendgrid/mail')
const fs = require('fs')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendResultEmail = (email, attachment) => {
    const buffer = Buffer.from(fs.readFileSync(attachment)).toString('base64')
    sgMail.send({
        to: email,
        from: 'jginsberg3@gmail.com',
        subject: 'Budget Predicted Categories',
        text: 'Attached are the predicted categories for your budget entries.',
        attachments: [
            {
                content: buffer,
                filename: 'predictions.csv',
                disposition: 'attachment',                
            }
        ]
    })
}

module.exports = sendResultEmail