/* eslint-disable camelcase */
import { Request, Response } from 'express';
import UpdateProjectService from '../services/UpdateProjectService';

export default class UpdateProjectsController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    try {
      const { name, navers } = request.body;
      const { id } = request.query;
      const { user_id } = request.user;

      const Project = new UpdateProjectService();

      const project = await Project.execute({
        name,
        user_id,
        id: String(id),
        navers,
      });

      return response.json(project);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
