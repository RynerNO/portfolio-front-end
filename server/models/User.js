import mongoose from 'mongoose';

import config from '@config';

import Bcrypt from 'bcryptjs';

import randomString from 'randomstring';

import Mail from '@fullstackjs/mail';

import jwt from 'jsonwebtoken';

import PasswordReset from './PasswordReset';

const UserSchema = new mongoose.Schema({
  name: String,

  email: String,

  createdAt: String,

  updatedAt: String,

  password: String,

  emailConfirmedAt: Date,

  emailConfirmCode: String
});

UserSchema.pre('save', function() {
  this.password = Bcrypt.hashSync(this.password);
  this.emailConfirmCode = randomString.generate(72);
  this.createdAt = new Date();
});

UserSchema.post('save', async function() {
  await this.sendEmailConfirmation();
});
UserSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, config.jwtSecret);
};

UserSchema.methods.comparePasswords = function(plainPassword) {
  return Bcrypt.compareSync(plainPassword, this.password);
};
UserSchema.methods.sendEmailConfirmation = async function() {
  await new Mail('confirm-account')
    .to(this.email, this.name)
    .subject('Please confirm your account')
    .data({
      name: this.name,
      url: `${config.url}/auth/email/confirm/${this.emailConfirmCode}`
    })
    .send();
};
UserSchema.methods.forgotPassword = async function() {
  const token = randomString.generate(72);

  await PasswordReset().create({
    token,
    email: this.email,
    createdAt: new Date()
  });
  await new Mail('forgot-password')
    .to(this.email, this.name)
    .subject('Password reset')
    .data({
      url: `${config.url}/auth/password/reset/${token}`,
      name: this.name
    })
    .send();
};

UserSchema.methods.resetPassword = async function(newPassword) {
  await this.updateOne({
    password: Bcrypt.hashSync(newPassword)
  });

  await PasswordReset().findOneAndDelete({
    email: this.email
  });
};
function loadModel(modelName, modelSchema) {
  return mongoose.models[modelName] // Check if the model exists
    ? mongoose.model(modelName) // If true, only retrieve it
    : mongoose.model(modelName, modelSchema); // If false, define it
}
export default () => loadModel('User', UserSchema);
