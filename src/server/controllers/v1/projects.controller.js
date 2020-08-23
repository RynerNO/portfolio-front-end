import Project from '@models/Project';
import fs from 'fs';
import simpleGit from 'simple-git';
import webp from 'webp-converter';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import rmdir from 'rimraf';


const getProjects = async (req, res) => {
  const projects = await Project().find();
  return res.status(200).json({
    projects
  });
};

const addProject = async (req, res) => {
  const { Title, Tech, Type, Duration, Description, Git, Index, Link } = req.body;
  try {
    const projectFolder = uuidv4()

    await fs.promises.mkdir(path.resolve('dist', `public/site_previews/${projectFolder}`), { recursive: true })
    
    
    const git = simpleGit()
    await git.clone(Git, path.resolve('dist', `public/site_previews/${projectFolder}`), ['--shared', '--local'])
    
    await webp.cwebp(path.resolve('dist', `public/temp/${req.files.Poster[0].filename}`), path.resolve('dist', `public/site_previews/${projectFolder}/poster.webp`), "-q 90");

    await fs.promises.rename(path.resolve('dist', `public/temp/${req.files.Poster[0].filename}`), path.resolve('dist', `public/site_previews/${projectFolder}/poster.png`))
    await Project().create({
      title: Title,
      tech: Tech,
      type: Type,
      description: Description,
      gitLink: Git,
      index: Index,
      link: Link,
      duration: Duration,
      projectFolder: projectFolder
    })
    return res.status(200).json({
      message: 'Successfully added project'
    });
}
  catch (e) { 
    console.log(e)
    return res.status(400).json({
      message: 'Error',
      error: e.message
    });
  }
}

const deleteProject = async (req, res) => {
  const { git } = req.body;
  try {
    const project = await Project().findOne({ git: git })
    await Project().deleteOne({ git: git })
    rmdir(path.resolve('dist', `public/site_previews/${project.projectFolder}`), function (error) {
      if (error) {
        console.error(error)
      }
    });
    return res.status(200).json({
      message: 'Project deleted'
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: 'Delete project failed',
      error: e.message
    })
  }

}
const updateProject = async (req, res) => {
  try {
    const { git } = req.body;
    const project = await Project().findOne({ git: git })
    const Git = simpleGit(path.resolve('dist', `public/site_previews/${project.projectFolder}`))
    await Git.pull('origin', 'master')
    res.status(200).json({ 
      message: 'Update successful'
    })
  } catch (e) {
    res.status(400).json({ 
      message: 'Error updating',
      error: e.message
    })
  }
}
const editProject = async (req, res) => {
  const { Title, Tech, Type, Duration, Description, Git, Index, OldGit } = req.body;
  try {
    const project = await Project().findOne({gitLink: OldGit})
    if (req.files.Poster[0]) {
      await webp.cwebp(path.resolve('dist', `public/temp/${req.files.Poster[0].filename}`), path.resolve('dist', `public/site_previews/${project.projectFolder}/poster.webp`), "-q 90");
      
      await fs.promises.rename(path.resolve('dist', `public/temp/${req.files.Poster[0].filename}`), path.resolve('dist', `public/site_previews/${project.projectFolder}/poster.png`))
    }
    await Project().updateOne({gitLink: OldGit}, {
      title: Title,
      tech: Tech,
      type: Type,
      description: Description,
      gitLink: Git,
      index: Index,
      duration: Duration,
    })
    res.status(200).json({
      message: 'Edit Successfull'
    })
  } catch (e) {
    res.status(500).json({
      message: 'Edit error',
      error: e.message
    })
  }
}
export default {
  getProjects,
  addProject,
  deleteProject,
  editProject,
  updateProject
}
