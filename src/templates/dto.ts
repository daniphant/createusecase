export default (className: string) => (
`export class ${className}RequestDto {
  private name: string;

  constructor({ name }) {
    this.name = name;
  }
}`);