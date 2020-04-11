import Project from '@models/Project';
import fs from 'fs';
import unzipper from 'unzipper';
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
  fs.createReadStream('./server/public/site_preview/' + archive.filename)
    .pipe(unzipper.Extract({ path: './server/public/site_preview/' + projectName.toLowerCase().replace(' ', '_') }))
    .on('close', function() {
      fs.unlink('./server/public/site_preview/' + archive.filename, (err) => {
        return
      })
    })
  
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
