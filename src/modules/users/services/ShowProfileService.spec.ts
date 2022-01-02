import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Murilo',
      email: 'murilomaia.bb@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile.email).toBe('murilomaia.bb@gmail.com');
    expect(profile.name).toBe('Murilo');
    expect(profile.id).toBe(user.id);
  });

  it('should not be able to show a non-existing user', async () => {
    await expect(showProfile.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
