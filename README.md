# AutoPassport OS — VS Code Prototype

This folder is the modular version of the original single-file AutoPassport OS prototype.

## Open the prototype
1. Open this folder in Visual Studio Code.
2. Install the **Live Server** extension if it is not already installed.
3. Right-click `index.html` and select **Open with Live Server**.

The prototype uses plain HTML, CSS, and vanilla JavaScript. It does not need npm, a build command, or package installation.

## Edit efficiently with Claude
Ask Claude to read `CLAUDE.md` and `CODEMAP.md` first. Then request changes one screen or feature at a time.

Example prompt:

```text
Read CLAUDE.md and CODEMAP.md. Improve only the Dashboard UX/UI. Preserve every existing interaction, keep RTL support, and avoid modifying unrelated screens. Test the affected dashboard actions after editing.
```

## File structure

```text
autopassport-os-vscode/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── images/
│   └── icons/
├── CLAUDE.md
├── CODEMAP.md
└── README.md
```
