import * as Yup from 'yup';

import User from '@models/User';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3),

  email: Yup.string()
    .required()
    .email(),

  password: Yup.string()
    .required()
    .min(6)
});

export default async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    await RegisterSchema.validate({ name, email, password });

    const existingUser = await User().findOne({ email });

    if (existingUser) {
      throw new Yup.ValidationError(
        'Эта почта уже используется',
        req.body,

        'email'
      );
    }
    return next();
  } catch (error) {
    res.status(422).json({
      [error.path]: error.message
    });
  }
};
