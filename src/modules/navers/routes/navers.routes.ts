/* eslint-disable camelcase */
import { Router } from 'express';
import ensureAuthentication from '../../users/middlewares/ensureAuthenticated';
import FilterNaversController from '../controllers/FilterNaversController';
import DetailNaversController from '../controllers/DetailNaversController';
import CreateNaversController from '../controllers/CreateNaversController';
import UpdateNaversController from '../controllers/UpdateNaversController';
import DeleteNaversController from '../controllers/DeleteNaversController';

const NaversRouter = Router();
NaversRouter.use(ensureAuthentication);

const filterNavers = new FilterNaversController();
const detailNavers = new DetailNaversController();
const createNavers = new CreateNaversController();
const updateNavers = new UpdateNaversController();
const deleteNavers = new DeleteNaversController();

NaversRouter.post('/store', createNavers.create);

NaversRouter.get('/index', filterNavers.filter);

NaversRouter.get('/show', detailNavers.listDatail);

NaversRouter.put('/update', updateNavers.update);

NaversRouter.delete('/delete', deleteNavers.delete);

export default NaversRouter;
