// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { writeFile } from 'fs';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-index-generator-plugin" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-index-generator-plugin.generate', async (resource) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from Index Generator!');

		if (resource && resource instanceof vscode.Uri) {
			const filePath = vscode.Uri.file(resource.fsPath).fsPath;
			const fileUri = vscode.Uri.file(filePath);
			const fileStat = await vscode.workspace.fs.stat(fileUri);

			let fileType = "Unknown";
			let selectedPath = filePath;
			let folderUri = fileUri;
			if (fileStat.type === vscode.FileType.File) {
				fileType = "File";
				folderUri = fileUri.with({ path: fileUri.path.split('/').slice(0, -1).join('/') });
			} else if (fileStat.type === vscode.FileType.Directory) {
				fileType = "Folder";
			}

			const directoryContents = await vscode.workspace.fs.readDirectory(folderUri);

			const exportsArray: string[] = [];

			for (const [file, type] of directoryContents) {
				if (type === vscode.FileType.Directory) {
					continue;
				}
				if (file === 'index.ts') {
					continue;
				}
				if (file.endsWith('.scss')) {
					continue;
				}

				const fileUri = folderUri.with({ path: `${folderUri.path}/${file}` });
				const fileContent = await vscode.workspace.fs.readFile(fileUri);
				const fileText = Buffer.from(fileContent).toString('utf-8');

				const match = /export default ([^\s]+)/.exec(fileText);
				if (match) {
					const exportedItem = match[1];
					const exportStatement = `export { default as ${exportedItem} } from './${file.replace(/\.[^.]+$/, '')}'`;
					exportsArray.push(exportStatement);
				}
			}

			const indexFilePath = `${folderUri.path}/index.ts`;
			const indexFileContent = exportsArray.join('\n') + '\n';

			writeFile(indexFilePath, indexFileContent, (error) => {
				if (error) {
					console.error('Error writing to index.ts:', error);
					return;
				}
				console.log('index.ts file updated.');
			});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
