import Project from '@models/Project';
import fs from 'fs';
import unzipper from 'unzipper';
import simpleGit from 'simple-git';
import webp from 'webp-converter';
 

 

const git = simpleGit()
const getProjects = async (req, res) => {
  const projects = await Project().find();
  return res.status(200).json({
    projects
  });
};
const addProject = async (req, res) => {
  const { Title, Tech, Type, Duration, Description, Git, Index } = req.body;
  try {
    await git.init();
    await git.addRemote('origin', Git);
    await git.pull('origin', 'master')

    webp.dwebp(`poster.webp`,"poster.png","-o",function(status,error)
  {
  	console.log(status,error);	
  });
    await Project().create({
      title: Title,
      tech: Tech,
      type: Type,
      description: Description,
      git: Git,
      index: Index,
      duration: Duration,
    })
    return res.status(200).json({
      message: 'Successfully added project'
    });
}
  catch (e) { 
    return res.status(400).json({
      message: 'Error'
    });
  }
}
export default {
  getProjects,
  addProject
}
