import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {

  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, oldPassword } = request.body;

    const userId = request.user.id;

    const updateProfile = container.resolve(UpdateUserProfileService);

    const user = await updateProfile.execute({
      name,
      email,
      password,
      userId,
      oldPassword
    });

    const { avatar } = user

    return response.json({
      id: userId,
      name,
      email,
      avatar,
    });
  }
}
