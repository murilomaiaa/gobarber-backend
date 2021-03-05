import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import User from '../../typeorm/entities/User';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    const json: Omit<User, 'password'> = user

    return response.json(json);
  }
}
