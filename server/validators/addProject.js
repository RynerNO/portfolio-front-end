import * as Yup from 'yup';
const SUPPORTED_IMAGE_FROMATS = ['image/jpg', 'image/jpeg', 'image/png']
const newProjectSchema = Yup.object().shape({
  projectType: Yup.string().required(),
  projectDuration: Yup.string().required(),
  projectName: Yup.string().required(),
  projectTech: Yup.string().required(),
  projectImage: Yup.mixed().required()
    .test('fileFormat', 'Image only', (value) => {
      return SUPPORTED_IMAGE_FROMATS.includes(value.type);
    }),
  projectArchive: Yup.mixed().required()
    .test('fileFormat', 'Image only', (value) => { console.log(value)})
});

export default (req, res, next) => {
  console.log(JSON.stringify(req.body))
  newProjectSchema.validate(req.body)
    .then(() => true)
    .catch(error => {
      console.log(error);
      res.status(422).json({
        [error.path]: error.message
      });
    });
};
