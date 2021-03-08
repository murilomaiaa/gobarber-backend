import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    handlebars.registerHelper(
      'ifCond',
      (leftSide, operator, rightSide, options): unknown => {
        switch (operator) {
          case '==':
            // eslint-disable-next-line eqeqeq
            return leftSide == rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '===':
            return leftSide === rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '!=':
            // eslint-disable-next-line eqeqeq
            return leftSide != rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '!==':
            return leftSide !== rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '<':
            return leftSide < rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '<=':
            return leftSide <= rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '>':
            return leftSide > rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '>=':
            return leftSide >= rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '&&':
            return leftSide && rightSide
              ? options.fn(this)
              : options.inverse(this);
          case '||':
            return leftSide || rightSide
              ? options.fn(this)
              : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
    );

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
