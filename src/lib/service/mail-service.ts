import nodemailer from "nodemailer"
import { validEmail } from "../utils";
import { logger } from "../logger";

const transporter = nodemailer.createTransport({
  host: `${process.env.EMAIL_SMTP_HOST}`,
  port: parseInt(process.env.EMAIL_SMTP_PORT  ?? '587'),
  secure: true, // Use `true` for port 465, `false` for all other ports
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_SMTP_USER || '',
    pass: process.env.EMAIL_SMTP_PASS || '',
  },
});


async function sendMail(to: string, subject: string, body: string) {

  if ( !validEmail(to) ) {
    throw new Error('Invalid Email')
  }
  return transporter.sendMail({
    from: {
      name: process.env.EMAIL_SMTP_FROM_NAME ?? "Support Team",
      address: process.env.EMAIL_SMTP_FROM_ADDRESS ?? "noreply@example.com"
    },
    to: to,
    subject: subject,
    html: body
  }).then(info => {
    logger.info('Email sent: ', info)
    return info
  }).catch(err => {
    console.error('Email send failed: ', err)
    throw err
  })
}

export {
  transporter,
  sendMail
}