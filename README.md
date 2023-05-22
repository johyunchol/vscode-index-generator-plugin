# vscode-index-generator-plugin

The vscode-index-generator-plugin is a Visual Studio Code extension that generates an `index.ts` file for a selected file or directory. The `index.ts` file will export all the default exports from the files in the directory.

## Features

- Generates an `index.ts` file with export statements for default exports in the selected file or directory.
- Supports TypeScript files (.ts) and directories.

## Installation

1. Launch Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon on the left sidebar or pressing `Ctrl+Shift+X`.
3. Search for "vscode-index-generator-plugin".
4. Click on the "Install" button for the extension authored by your name.

## Usage

1. In the Explorer view, right-click on a file or directory.
2. Select "Generate index.ts" from the context menu.
3. The extension will generate an `index.ts` file in the same directory.
4. The `index.ts` file will contain export statements for default exports in the selected file or directory.

## Known Issues

- Only default exports are supported. Named exports are not included in the generated `index.ts` file.
- The extension assumes that the default exports are in the form of `export default [exportedItem]`.

## Release Notes

### 1.0.0

Initial release of vscode-index-generator-plugin.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/your-username/vscode-index-generator-plugin).

## License

This extension is licensed under the [MIT License](https://opensource.org/licenses/MIT).
