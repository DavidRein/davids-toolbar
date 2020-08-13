// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('davids-toolbar.quickRun', () => {
		
		//BUILD TERMINAL COMMAND
		//Step 1: get workspace directory path
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if(workspaceFolders == undefined) {
			vscode.window.showErrorMessage('No workspace folder is currently open');
			return;
		}
		const wdpath = workspaceFolders[0].uri
		//Step 2: get 'run command' configuration value 
		const config = vscode.workspace.getConfiguration('quickRun');
		const command = config.get<string>('runCommand');
		if(command == undefined) {
			vscode.window.showErrorMessage('Error: Command ${ command } is invalid');
			return;
		}

		//OPEN TERMINAL
		var terminal = vscode.window.activeTerminal;
		if(terminal == undefined) {
			terminal = vscode.window.createTerminal({
				name: "Output",
				cwd: wdpath,
				hideFromUser:false
			})
		}
		terminal.show();
		terminal.sendText(command);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
