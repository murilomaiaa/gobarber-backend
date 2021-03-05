import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'mu@rilo.com',
      name: 'Murilo',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Murilo');
  });
  it('should not be able to create a user with a already existent email ', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'mu@rilo.com',
      name: 'Murilo',
      password: '123456',
    });

    await expect(
      createUser.execute({
        email: 'mu@rilo.com',
        name: 'Murilo',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
