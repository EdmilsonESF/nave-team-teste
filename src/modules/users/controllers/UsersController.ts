import { Request, Response } from 'express';
import * as yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import UserService from '../services/UserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email('Email inválido')
          .strict()
          .required('[email] obrigatório'),
        password: yup
          .string()
          .min(3, 'No míni,o 3 caracteres')
          .required('[password] obrigatório'),
      });

      await schema.validate(request.body);
    } catch (err) {
      throw new AppError(err.message);
    }

    const createUser = new UserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}
