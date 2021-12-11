export default (className: string, variablaName: string, dtoFileName: string, useCaseFileName: string) => (
  `import { Request, Response } from 'express';
import ${className}UseCase from './${useCaseFileName}';
import { ${className}RequestDto } from './${dtoFileName}';

export default class ${className}Controller {
  constructor(private readonly ${variablaName}UseCase: ${className}UseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const ${variablaName}RequestDto: ${className}RequestDto = new ${className}RequestDto(req.body);

    const response = await this.${variablaName}UseCase.execute(${variablaName}RequestDto);

    return res.status(200).json(response);
  }
}
`);