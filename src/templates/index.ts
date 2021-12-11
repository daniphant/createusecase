export default (className: string, variablaName: string, useCaseFileName: string, controllerFileName: string) => (
  `import ${className}UseCase from './${useCaseFileName}';
import ${className}Controller from './${controllerFileName}';

const ${variablaName}UseCase = new ${className}UseCase();

const ${variablaName}Controller = new ${className}Controller(${variablaName}UseCase);

export { ${variablaName}Controller, ${variablaName}UseCase };
`);
