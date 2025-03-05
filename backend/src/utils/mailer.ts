import nodemailer from 'nodemailer';
// TODO: change to tenant email
export const mailer = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'tenat@morning.com',
    pass: 'Morning123'
  }
});


