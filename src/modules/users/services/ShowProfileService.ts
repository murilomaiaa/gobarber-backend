import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

type Profile = Omit<User, 'password'>

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute(userId: string): Promise<Profile> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User not found')

    return user
  }
}
