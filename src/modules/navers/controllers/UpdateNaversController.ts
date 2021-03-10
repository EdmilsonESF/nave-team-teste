/* eslint-disable camelcase */
import { Request, Response } from 'express';
import * as yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import UpdateNaversService from '../services/UpdateNaversService';

export default class CreateNaversController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    } = request.body;

    try {
      const schema = yup.object().shape({
        name: yup.string().strict().required('[name] obrigatório'),
        birthdate: yup.string().strict().required('[birthdate] obrigatório'),
        admission_date: yup
          .string()
          .strict()
          .required(' [admission_date] obrigatório'),
        job_role: yup.string().strict().required('[job_role] obrigatório'),
        projects: yup.array().required('[projects] obrigatório'),
      });

      await schema.validate(request.body);
    } catch (err) {
      throw new AppError(err.message);
    }

    const { id } = request.query;
    const { user_id } = request.user;

    const Naver = new UpdateNaversService();

    const naver = await Naver.update({
      name,
      birthdate,
      admission_date,
      job_role,
      user_id,
      id: Number(id),
      projects,
    });

    return response.json(naver);
  }
}
