import { Router } from 'express';
import usersRouter from '../../modules/users/routes/users.routes';
import naversRouter from '../../modules/navers/routes/navers.routes';
import sessionsRouter from '../../modules/users/routes/sessions.routes';
import ProjectsRouter from '../../modules/projects/routes/projects.routes';

const routes = Router();

routes.use('/signup', usersRouter);
routes.use('/navers', naversRouter);
routes.use('/projects', ProjectsRouter);
routes.use('/login', sessionsRouter);

export default routes;
