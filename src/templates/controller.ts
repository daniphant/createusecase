import * as vscode from "vscode";



export default (className: string, variablaName: string, dtoFileName: string, useCaseFileName: string) => {
  const config = vscode.workspace.getConfiguration("createusecase");
  const dtoStyle = config.get("dtoStyle") as string;

  return   `import { Request, Response } from 'express';
  import ${className}UseCase from './${useCaseFileName}';
  ${dtoStyle === "class with constructor" ? `import { ${className}RequestDto } from './${dtoFileName}';` : ""}
  
  export default class ${className}Controller {
    constructor(private readonly ${variablaName}UseCase: ${className}UseCase) {}
  
    async handle(req: Request, res: Response): Promise<Response> {
      ${
        dtoStyle === "class with constructor" ? 
          `const ${variablaName}RequestDto = new ${className}RequestDto(req.body.name);
      const response = await this.${variablaName}UseCase.execute(${variablaName}RequestDto);`
        : `const response = await this.${variablaName}UseCase.execute(req.body);`
      }
  
      return res.status(200).json(response);
    }
  }`;
};
