import { Router } from 'express';

import authRouter from './v1/auth';

import projectsRouter from './v1/projects'
const v1Router = new Router();

v1Router.use('/api/v1/auth', authRouter);
v1Router.use('/api/v1/projects', projectsRouter);
export default v1Router;
