import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository)
  })

  it('should be able to recover the password using the email', async () => {
    await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'mu@rilo.com',
      password: '123456',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await sendForgotPasswordEmail.execute('mu@rilo.com');

    expect(sendMail).toHaveBeenCalled()
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute('mu@rilo.com'))
      .rejects.toBeInstanceOf(AppError)
  })

  it('should generate an user token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'mu@rilo.com',
      password: '123456',
    });

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    await sendForgotPasswordEmail.execute('mu@rilo.com');

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
});
