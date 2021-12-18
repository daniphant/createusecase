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
	const useSameName = config.get("useSameName") as boolean;

	const folderName = (await vscode.window.showInputBox({
		placeHolder: 'Enter the name of the use case folder...',
		prompt: 'Separate words with a space, the casing will be determined by the configuration settings.',
	}));


	if (!folderName) { return; }

	const useCaseFileName = useSameName ? folderName : (await vscode.window.showInputBox({
		placeHolder: 'Enter the name of the use case file...',
		prompt: 'Separate words with a space, the casing will be determined by the configuration settings.',
	})) || folderName;

	const path = args.fsPath;

	generateBoilerPlate(folderName.toLowerCase(), useCaseFileName.toLowerCase(), path);
	vscode.window.showInformationMessage(`Boilerplate generated successfully!`);
}

export function deactivate() { }
