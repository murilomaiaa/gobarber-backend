import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private transporter: Transporter;

  constructor(
    // @inject('MailTemplateProvider')
    // private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount((error, account) => {
      if (error) throw error;

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.transporter = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    template,
    body
  }: ISendMailDTO): Promise<void> {
    const message = await this.transporter.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'contato@gobarber.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: body
      // await this.mailTemplateProvider.parse(template),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
