import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'mu@rilo.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfile.execute({
      userId: user.id,
      email: 'murilomaia@mail.com',
      name: 'Murilo Maia',
    });

    expect(updatedUser.email).toBe('murilomaia@mail.com')
    expect(updatedUser.name).toBe('Murilo Maia')
    expect(updatedUser.id).toBe(user.id)
  });

  it('should not be able to change to an email already used', async () => {
    await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'murilo@mail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Murilo Maia',
      email: 'murilomaia@mail.com',
      password: '123456',
    });

    await expect(
      updateUserProfile.execute({
        userId: user.id,
        email: 'murilo@mail.com',
        name: user.name,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        userId: 'inexistent id',
        email: 'inexistent@mail.com',
        name: 'inexistent',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'murilo@mail.com',
      password: '123456',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    const updatedUser = await updateUserProfile.execute({
      userId: user.id,
      email: user.email,
      name: 'Murilo Maia',
      oldPassword: '123456',
      password: '123123'
    });


    expect(updatedUser.email).toBe('murilo@mail.com')
    expect(updatedUser.name).toBe('Murilo Maia')
    expect(updatedUser.id).toBe(user.id)
    expect(updatedUser.password).toBe('123123')
    expect(generateHash).toHaveBeenCalled()
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'murilo@mail.com',
      password: '123456',
    });

    await expect(updateUserProfile.execute({
      userId: user.id,
      email: user.email,
      name: 'Murilo Maia',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to update tha password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'murilo@mail.com',
      password: '123456',
    });

    await expect(updateUserProfile.execute({
      userId: user.id,
      email: user.email,
      name: 'Murilo Maia',
      oldPassword: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  })
});

