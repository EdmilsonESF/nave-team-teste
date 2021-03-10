/* eslint-disable camelcase */
import { Request, Response } from 'express';
import * as yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import UpdateProjectService from '../services/UpdateProjectService';

export default class UpdateProjectsController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const { name, navers } = request.body;
    const { id } = request.query;
    const { user_id } = request.user;

    try {
      const schema = yup.object().shape({
        name: yup.string().strict().required('[name] obrigatório'),
        navers: yup.array().required('[navers] obrigatório'),
      });

      await schema.validate(request.body);
    } catch (err) {
      throw new AppError(err.message);
    }

    const Project = new UpdateProjectService();

    const project = await Project.execute({
      name,
      user_id,
      id: String(id),
      navers,
    });

    return response.json(project);
  }
}
