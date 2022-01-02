import { Request, Response } from 'express';

import { container } from 'tsyringe';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const profile = await showProfile.execute(userId);

    delete profile.password;

    return response.json(profile);
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
      oldPassword,
    });

    const { avatar } = user;

    return response.json({
      id: userId,
      name,
      email,
      avatar,
    });
  }
}
