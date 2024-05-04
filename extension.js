// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const thesaurus = require('thesaurus');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "acronymadder" is now active!');
	let disposable = vscode.commands.registerCommand('acronymadder.showSynonym', function () {

		const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
		const document = editor.document;
        const wordRange = document.getWordRangeAtPosition(editor.selection.active);
        if (!wordRange) {
            return;
        }
		const word = document.getText(wordRange);
        const synonyms = thesaurus.find(word);
		vscode.window.showQuickPick(synonyms, {
			placeHolder: 'Select a Synonym',
			ignoreFocusOut: true
		}).then(selected => {
			if (selected) {
				console.log(selected);
				insertSynonyms(selected)
			}
		});
   
		vscode.window.showInformationMessage('Hello World from acronymadder!');
	});

	context.subscriptions.push(disposable);
}

function insertSynonyms(synonym) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    editor.edit(editBuilder => {
        const selection = editor.selection;
        editBuilder.replace(selection, synonym);
    });
}


function deactivate() {}

module.exports = {
	activate,
	deactivate
}
