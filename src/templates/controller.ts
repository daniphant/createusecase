export default (variablaName: string, className: string) => (
`import { Request, Response } from 'express';
import ${className}UseCase from './${className}.useCase';
import { ${className}RequestDto } from './${className}.dto';

export default class ${className}Controller {
  constructor(private readonly ${variablaName}UseCase: ${className}UseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const ${variablaName}RequestDto: ${className}RequestDto = new ${className}RequestDto(req.body);

    const response = await this.${variablaName}UseCase.execute(${variablaName}RequestDto);

    return res.status(200).json(response);
  }
}
`);