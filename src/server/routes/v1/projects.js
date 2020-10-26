import { Router } from 'express';
import multer from 'multer';
import authMiddleware from '@middleware/auth'
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await fs.promises.mkdir(path.resolve('dist', `public/temp`), { recursive: true })
    cb(null, path.resolve('dist', `public/temp`))
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.png`)
  }})
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "Poster" && file.mimetype === "image/png") {
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
router.post('/add', authMiddleware, upload.fields([{ name: 'Poster', maxCount: 1 }]), controller.addProject)
router.post('/edit', authMiddleware, upload.fields([{ name: 'Poster', maxCount: 1 }]), controller.editProject)  
router.post('/delete', authMiddleware,  upload.none(), controller.deleteProject)
router.post('/update', authMiddleware, upload.none(), controller.updateProject)
export default router;
