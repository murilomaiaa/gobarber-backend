import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123456789');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11, 0, 0, 0);

    await createAppointment.execute({
      date: appointmentDate,
      providerId: '123456789',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
