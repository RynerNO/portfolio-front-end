import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
});

export default (req, res, next) => {
  LoginSchema.validate(req.body)
    .then(() => next())
    .catch(error => {
      res.status(422).json({
        [error.path]: error.message
      });
    });
};