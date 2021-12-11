export default (className: string, dtoFileName: string) => (
`import { ${className}RequestDto } from './${dtoFileName}';

export default class ${className}UseCase {
  constructor(private readonly repository: any) {}

  async execute(request: ${className}RequestDto) {
    throw new Error('Not implemented');
  }
}`);