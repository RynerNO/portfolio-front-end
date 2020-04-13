import Project from '@models/Project';
import fs from 'fs';
import unzipper from 'unzipper';
import e from 'express';
const getProjects = async (req, res) => {
  const projects = await Project().find();
  return res.status(200).json({
    projects
  });
};
const addProject = async (req, res) => {
  let { projectName, projectTech, projectType, projectDuration } = req.body;
  let imageName = req.files['projectImage'][0]
  let archive = req.files['projectArchive'][0]
  if (process.NODE_ENV !== 'production') {
    fs.createReadStream('./dist/public/site_preview/' + archive.filename)
      .pipe(unzipper.Extract({ path: './dist/public/site_preview/' + projectName.toLowerCase().replace(' ', '_') }))
      .on('close', function () {
        fs.unlink('./dist/public/site_preview/' + archive.filename, (err) => {
          return
        })
      })
  } else {
    fs.createReadStream('/../../public/site_preview/' + archive.filename)
      .pipe(unzipper.Extract({ path: '/../../public/site_preview/' + projectName.toLowerCase().replace(' ', '_') }))
      .on('close', function () {
        fs.unlink('/../../public/site_preview/' + archive.filename, (err) => {
          return
        })
      })
  }
  await Project().create({
    name: projectName,
    tech: projectTech,
    type: projectType,
    duration: projectDuration,
    imageName: imageName.filename
  })
  return res.status(200).json({
    message: 'Successfully added project'
  });
}
export default {
  getProjects,
  addProject
}
