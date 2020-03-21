import User from '@models/user';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User().findOne({ email });

  if (user) {
    if (user.comparePasswords(password)) {
      const token = user.generateToken();
      return res.json({
        user,
        token,
        status: true
      });
    }
  }
  return res.status(400).json({
    form: 'Неверный логин или пароль'
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User().create({
    name,

    email,

    password
  });
  const token = user.generateToken();
  return res.status(201).json({ user, token, status: true });
};

const forgotPassword = async (req, res) => {
  await req.user.forgotPassword();

  return res.json({
    message: 'Password reset link is sent'
  });
};

const resetPassword = async (req, res) => {
  const { user } = req;
  await user.resetPassword(req.body.password);

  return res.status(200).json({ password: 'Password reset successfully' });
};

const emailConfirm = async (req, res) => {
  const { user } = req;
  await User().findAndModify(
    { email: user.email },
    {
      emailConfirmCode: null,
      emailConfirmedAt: new Date()
    }
  );
  const token = user.generateToken();
  return res.statur(200).json({
    user,
    token,
    status: true
  });
};

const resendConfirmationEmail = async (req, res) => {
  if (!req.user.emailConfirmedAt) {
    await req.user.sendEmailConfirmation();
  }

  return res.json({
    message: 'Email confirm sent'
  });
};
export default {
  login,

  register,

  forgotPassword,

  resetPassword,

  emailConfirm,

  resendConfirmationEmail
};
