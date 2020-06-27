import * as Yup from 'yup';
import axios from 'axios';

const messageSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
  text: Yup.string().required(),
  token: Yup.string().required()
});

export default (req, res, next) => {
  messageSchema.validate(req.body)
    .then(() => {
      const secret_key = process.env.recaptchaSecret;
      const token = req.body.token;
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
  
      axios.post(url)
        .then(response => {
          console.log(response)
          if (response.data.success) {
           
            next()
          } else {

            res.status(422).json({
              'error': 'Capthca Failed'
            })
          }
        })
        .catch(error => res.status(422).json({
            error
          })); 
      
    })
    .catch(error => {
      console.log(error);
      res.status(422).json({
        [error.path]: error.message
      });
    });
};
