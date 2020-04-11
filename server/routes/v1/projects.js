import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '@middleware/auth'
import path from 'path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/site_preview/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }})
const upload = multer({storage: storage})
import controller from '@controllers/v1/projects.controller';
const router = new Router();

router.get('/get', controller.getProjects)
router.post('/add', authMiddleware, upload.fields([{ name: 'projectImage', maxCount: 1 }, { name: 'projectArchive', maxCount: 1 }]), controller.addProject) 
export default router;
