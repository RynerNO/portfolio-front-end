import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '@middleware/auth'
import addProjectValidator from '@validators/addProject';
import path from 'path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (process.NODE_ENV !== 'production') {
      cb(null, path.resolve('dist', 'public/site_preview/'))
    } else {
      cb(null, path.resolve('./', 'public/site_preview/'))
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }})
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
  if (file.fieldname === "projectImage" && (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")) {
      cb(null, true);
  } else if (file.fieldname === "projectArchive" && (file.mimetype === "application/x-zip-compressed")) {
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
