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

  const variableName = formatByCasing(name, 'camel');
  const className = formatByCasing(name, 'pascal');

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  // Creating the files
  createFile(name, folderPath, dto(className), 'dto');
  createFile(name, folderPath, useCase(className), 'useCase');
  createFile(name, folderPath, controller(variableName, className), 'controller');
  createFile(name, folderPath, index(variableName, className), 'index');
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
      return name.replace(/([A-Z])/g, '_$1').toLowerCase();
    case 'kebab-case':
      return name.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
};

const createFile = (name: string, path: string, template: string, type: string) => {
  const config = vscode.workspace.getConfiguration("createusecase");
  const fileCaseStyle = config.get("fileCaseStyle") as string;
  const shouldDotFiles = config.get("shouldDotFiles") as boolean;

  const fileName = shouldDotFiles ?
    formatByCasing(name, fileCaseStyle) + '.' + type + '.ts'
    :
    formatByCasing(`${name} ${type}`, fileCaseStyle) + '.ts';


  fs.writeFileSync(path + '/' + fileName, template);
};


