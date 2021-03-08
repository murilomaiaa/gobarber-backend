interface ITemplateVariables {
  [key: string]: string | number | Record<string, unknown> | Array<any>;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
