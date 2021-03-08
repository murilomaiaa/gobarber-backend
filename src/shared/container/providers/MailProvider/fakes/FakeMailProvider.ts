import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail({ subject, template, to, from, body }: ISendMailDTO): Promise<void> {
    this.messages.push({
      to: `${to.name} <${to.email}>`,
      body
    });
  }
}
