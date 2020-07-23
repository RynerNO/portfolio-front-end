import dotenv from 'dotenv';

dotenv.config();

export default {
  databaseUrl: process.env.DATABASE_URL,
  url: process.env.APP_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SERCET || 'hYW#T#H;%RCNozF=X!sh',
  recaptchaSecret: process.env.recaptchaSecret || '',
  mailFrom: process.env.MAIL_FROM,
  mailtTo: process.env.MAIL_TO,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  clientID: process.env.GOOGLE_CLIENT_ID,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN
};
