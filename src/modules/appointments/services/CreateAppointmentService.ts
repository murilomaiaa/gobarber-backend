import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * Receber informações
 * Tratativa de erros e excessões
 * Repositório
 */
interface Request {
  providerId: string;
  date: Date;
}

/**
 * Dependecy inversion (SOLID)
 */

class CreateAppointmentService {
  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This schedule is not avaliable');
    }

    const appointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    console.log(appointment);
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
