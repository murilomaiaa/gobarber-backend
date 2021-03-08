import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  body: string;
  from?: IMailContact;
  subject?: string;
  template?: IParseMailTemplateDTO;
}
