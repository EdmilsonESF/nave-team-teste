/* eslint-disable camelcase */
import { Request, Response } from 'express';
import DeleteProjectService from '../services/DeleteProjectService';

export default class DetailProjectsController {
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.user;
      const { id } = request.query;

      const Project = new DeleteProjectService();

      await Project.execute(user_id, Number(id));

      return response.send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
