import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
    );

    await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'mu@rilo.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'mu@rilo.com',
    });

    // 15 min
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Murilo');
  });
});
