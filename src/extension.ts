import * as vscode from 'vscode';
import { generateBoilerPlate } from './generator';

interface IHandleBoilerPlateProps {
	args: any;
}

export function activate(context: vscode.ExtensionContext) {
	const mainFunc = vscode.commands.registerCommand("createusecase.generateBoilerPlate", args => {
		handleBoilerPlateRequest({ args });
	});

	context.subscriptions.push(mainFunc);
}


async function handleBoilerPlateRequest({ args }: IHandleBoilerPlateProps) {
	const config = vscode.workspace.getConfiguration("createusecase");

	let name = (await vscode.window.showInputBox({
		placeHolder: 'Enter the name of the use case...',
		prompt: 'Separate word by word with a space',
	}));

	if (!name) {return;}

	const wordCount = name.split(' ').length;
	
	if (wordCount === 1 && !(config.get("createusecase.ignoreWordCountWarning") as boolean)) {
		vscode.window.showWarningMessage(`You have entered ${wordCount} words. Are you sure you separated them with spaces?`);
	}

	const path = args.fsPath;

	generateBoilerPlate(name.toLowerCase(), path);
	vscode.window.showInformationMessage(`Boilerplate generated successfully!`);
}

export function deactivate() { }
