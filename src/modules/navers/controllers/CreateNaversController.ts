/* eslint-disable camelcase */
import { Request, Response } from 'express';
import * as yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import CreateNaversService from '../services/CreateNaversService';

export default class CreateNaversController {
  public async create(request: Request, response: Response): Promise<Response> {
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

    const Naver = new CreateNaversService();

    const { user_id } = request.user;

    const naver = await Naver.execute({
      name,
      birthdate,
      admission_date,
      job_role,
      user_id,
      projects,
    });

    return response.json(naver);
  }
}
