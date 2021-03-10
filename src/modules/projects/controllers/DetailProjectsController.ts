/* eslint-disable camelcase */
import { Request, Response } from 'express';
import DetailProjectService from '../services/DetailProjectService';

export default class DetailProjectsController {
  public async listDatail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { user_id } = request.user;
    const { id } = request.query;

    const Project = new DetailProjectService();

    const project = await Project.execute(user_id, Number(id));

    return response.json(project);
  }
}
