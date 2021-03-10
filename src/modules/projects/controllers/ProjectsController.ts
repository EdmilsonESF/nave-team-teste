/* eslint-disable camelcase */
import { Request, Response } from 'express';
import CreateProjectService from '../services/CreateProjectService';

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, navers } = request.body;

      const createProject = new CreateProjectService();

      const { user_id } = request.user;

      const project = await createProject.execute({
        name,
        user_id,
        navers,
      });

      return response.json(project);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
