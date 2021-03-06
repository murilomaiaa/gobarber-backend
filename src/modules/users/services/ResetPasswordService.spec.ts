import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    )
  })

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'mu@rilo.com',
      password: '123456',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token
    });

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('123123')
    expect(updatedUser?.password).toBe('123123')
  });

  it('should not be able to reset the password with a non-existing token', async () => {
    await expect(
      resetPassword.execute({
        password: '123123',
        token: 'non-existent token'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with a non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existent user id')

    await expect(
      resetPassword.execute({
        password: '123123',
        token
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with a expired token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'mu@rilo.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const now = new Date()
      return now.setHours(now.getHours() + 3)
    })

    await expect(
      resetPassword.execute({
        password: '123123',
        token
      })
    ).rejects.toBeInstanceOf(AppError)
  })
});
