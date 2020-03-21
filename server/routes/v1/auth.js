import { Router } from 'express';

import authController from '@controllers/v1/auth.controller';

import registerValidator from '@validators/register';

import loginValidator from '@validators/login';

import forgotPasswordValidator from '@validators/forgotPassword';

import resetPasswordValidator from '@validators/resetPassword';

import emailConfirmValidator from '@validators/emailConfirm';

import authMiddleware from '@middleware/auth';

const authRouter = new Router();

authRouter.post('/login', loginValidator, authController.login);

authRouter.post('/register', registerValidator, authController.register);

authRouter.post(
  '/password/reset',
  forgotPasswordValidator,
  authController.forgotPassword
);

authRouter.post(
  '/passwprd/reset/:token',
  resetPasswordValidator,
  authController.resetPassword
);

authRouter.post(
  '/email/confirm',
  emailConfirmValidator,
  authController.emailConfirm
);

authRouter.post(
  '/email/resend',
  authMiddleware,
  authController.resendConfirmationEmail
);
export default authRouter;
