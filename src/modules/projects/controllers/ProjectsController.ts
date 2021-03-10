/* eslint-disable camelcase */
import { Request, Response } from 'express';
import * as yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import CreateProjectService from '../services/CreateProjectService';

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, navers } = request.body;

    try {
      const schema = yup.object().shape({
        name: yup.string().strict().required('[name] obrigatório'),
        navers: yup.array().required('[navers] obrigatório'),
      });

      await schema.validate(request.body);
    } catch (err) {
      throw new AppError(err.message);
    }

    const createProject = new CreateProjectService();

    const { user_id } = request.user;

    const project = await createProject.execute({
      name,
      user_id,
      navers,
    });

    return response.json(project);
  }
}
