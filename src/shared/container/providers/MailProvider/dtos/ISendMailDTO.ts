import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

type ISendMailDTO = {
  to: IMailContact;
  from?: IMailContact;
  subject?: string;
  template: IParseMailTemplateDTO;
}

export default ISendMailDTO;
