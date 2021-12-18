import * as fs from 'fs';
import * as vscode from 'vscode';

import controller from './templates/controller';
import dto from './templates/dto';
import useCase from './templates/useCase';
import index from './templates/index';

export const generateBoilerPlate = (name: string, path: string) => {
  const config = vscode.workspace.getConfiguration("createusecase");
  const folderCaseStyle = config.get("folderCaseStyle") as string;

  // Creating the folder
  const folderPath = path + '/' + formatByCasing(name, folderCaseStyle);

  const variableName = formatByCasing(name, 'camelCase');
  const className = formatByCasing(name, 'PascalCase');


  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Creating the files
  const dtoFileName = resolveFileName(name, folderPath, 'dto');
  const dtoTemplate = dto(className);
  fs.writeFileSync(folderPath + '/' + dtoFileName + '.ts', dtoTemplate);

  const useCaseFileName = resolveFileName(name, folderPath, 'useCase');
  const useCaseTemplate = useCase(className, dtoFileName);
  fs.writeFileSync(folderPath + '/' + useCaseFileName + '.ts', useCaseTemplate);

  const controllerFileName = resolveFileName(name, folderPath, 'controller');
  const controllerTemplate = controller(className, variableName, dtoFileName, useCaseFileName);
  fs.writeFileSync(folderPath + '/' + controllerFileName + '.ts', controllerTemplate);

  const indexFileName = resolveFileName(name, folderPath, 'index');
  const indexTemplate = index(className, variableName, useCaseFileName, controllerFileName);
  fs.writeFileSync(folderPath + '/' + indexFileName + '.ts', indexTemplate);
};

const formatByCasing = (name: string, casing: string = 'camelCase') => {
  switch (casing) {
    case 'camelCase':
    default:
      const firstWord = name.split(' ')[0];
      const restOfWords = name.split(' ').slice(1);
      return firstWord.toLowerCase() + restOfWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    case 'PascalCase':
      return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    case 'snake_case':
      return name.replace(/ /g, '_').toLowerCase();
    case 'kebab-case':
      return name.replace(/ /g, '-').toLowerCase();
  }
};

const resolveFileName = (name: string, path: string, type: string) => {
  const config = vscode.workspace.getConfiguration("createusecase");
  const fileCaseStyle = config.get("fileCaseStyle") as string;
  const shouldDotFiles = config.get("shouldDotFiles") as boolean;

  const fileName = type === 'index' ?
    'index.ts' :
    shouldDotFiles ?
      formatByCasing(name, fileCaseStyle) + '.' + type
      :
      formatByCasing(`${name} ${type}`, fileCaseStyle);

  return fileName;
};


