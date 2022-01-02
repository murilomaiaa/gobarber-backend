import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

type Message = ISendMailDTO;

export default class FakeMailProvider implements IMailProvider {
  private messages: Message[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
