export default (className: string) => (
`import { ${className}RequestDto } from './${className}.dto';

export default class ${className}UseCase {
  constructor(private readonly repository: any) {}

  async execute(request: ${className}RequestDto) {
    throw new Error('Not implemented');
  }
}`);