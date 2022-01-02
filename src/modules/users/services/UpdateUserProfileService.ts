import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

type IRequest = {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
};

@injectable()
export default class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    email,
    name,
    oldPassword,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User not found');

    const userWithTheGivenEmail = await this.usersRepository.findByEmail(email);

    if (userWithTheGivenEmail && userWithTheGivenEmail.id !== user.id)
      throw new AppError('Email already in use');

    Object.assign(user, { name, email });

    if (password) {
      if (!oldPassword) {
        throw new AppError('Inform the old password');
      }

      const oldPasswordIsWrong = !(await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      ));

      if (oldPasswordIsWrong) throw new AppError('Old password does not match');

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
