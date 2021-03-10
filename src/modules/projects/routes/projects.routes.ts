/* eslint-disable camelcase */
import { Router } from 'express';
import ensureAuthentication from '../../users/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';
import ListProjectsController from '../controllers/ListProjectsController';
import DetailProjectsController from '../controllers/DetailProjectsController';
import UpdateProjectsController from '../controllers/UpdateProjectsController';
import DeleteProjectsController from '../controllers/DeleteProjectsController';

const ProjectsRouter = Router();
ProjectsRouter.use(ensureAuthentication);

const projectsController = new ProjectsController();
const listProjects = new ListProjectsController();
const datailProjects = new DetailProjectsController();
const updateProjects = new UpdateProjectsController();
const deleteProjects = new DeleteProjectsController();

ProjectsRouter.post('/store', projectsController.create);

ProjectsRouter.get('/index', listProjects.list);

ProjectsRouter.get('/show', datailProjects.listDatail);

ProjectsRouter.put('/update', updateProjects.update);

ProjectsRouter.delete('/delete', deleteProjects.delete);

export default ProjectsRouter;
