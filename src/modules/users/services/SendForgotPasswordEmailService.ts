import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError("User does not exists")

    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail({
      to: { email, name: '' },
      body: `Pedido de recuperação de senha ${token}`
    })
  }
}

export default SendForgotPasswordEmailService;
