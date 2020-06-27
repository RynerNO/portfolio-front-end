import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '@middleware/auth'
import path from 'path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { Title } = req.body
    if (process.NODE_ENV !== 'production') {
      cb(null, path.resolve('dist', `public/site_preview/${Title}`))
    } else {
      cb(null, path.resolve('./', `public/site_preview/${Title}`))
    }
  },
  filename: function (req, file, cb) {
    cb(null, 'poster.webp') //Appending extension
  }})
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
  if (file.fieldname === "Poster" && file.mimetype === "image/webp") {
      cb(null, true);
  }
  else {
      cb(new Error('Unsupported format'), false);
  }
  }

})
import controller from '@controllers/v1/projects.controller';
const router = new Router();

router.get('/get', controller.getProjects)
router.post('/add', authMiddleware, upload.fields([{ name: 'projectImage', maxCount: 1 }, { name: 'projectArchive', maxCount: 1 }]), controller.addProject) 
export default router;
