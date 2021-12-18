import * as vscode from 'vscode';

export default (className: string) => {
  const config = vscode.workspace.getConfiguration("createusecase");
  const dtoStyle = config.get("dtoStyle") as string;

  return `export ${dtoStyle === "interface" ? "interface ": "class "}${className}RequestDto {
  private name: string;

  ${dtoStyle === "class with constructor" ? `constructor(name: string) {
    this.name = name;
  }` : ``}
}`;
};