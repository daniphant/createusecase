export default (variablaName: string, className: string) => (
`import ${className}UseCase from './${className}.useCase';
import ${className}Controller from './${className}.controller';

const ${variablaName}UseCase = new ${className}UseCase();

const ${variablaName}Controller = new ${className}Controller(${variablaName}UseCase);

export { ${variablaName}Controller, ${variablaName}UseCase };
`);
