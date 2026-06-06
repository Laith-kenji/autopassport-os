# AutoPassport OS — Claude Editing Instructions

## Goal
Improve the AutoPassport OS clickable prototype while preserving existing behavior. The project is a dependency-free static prototype designed to run through VS Code Live Server.

## Start Here
1. Read `CODEMAP.md` before opening large files.
2. Inspect only the screen, selector, or function related to the requested task.
3. Avoid reading or rewriting an entire file unless the task truly requires a global refactor.

## Project Files
- `index.html`: markup for all desktop screens, drawers, overlays, and modals.
- `css/styles.css`: global styles, components, responsive rules, and RTL adjustments.
- `js/app.js`: mock data and interactions.
- `assets/images/`: place future images here.
- `assets/icons/`: place future icons here.

## Editing Rules
- Keep the project in plain HTML, CSS, and vanilla JavaScript unless explicitly asked to migrate frameworks.
- Preserve all existing clickable interactions.
- Make targeted changes. Do not rewrite unrelated screens.
- Reuse existing CSS variables and classes before adding duplicates.
- Keep changes responsive for desktop, tablet, and mobile widths.
- Preserve RTL support and the language-direction toggle.
- Do not add external packages for simple visual changes.
- Do not remove prototype labels or simulated-data labels unless explicitly instructed.
- Before finishing, check the browser console for errors and test the affected interaction.

## Design Direction
- Premium, modern, calm, and easy to scan.
- Clear hierarchy and comfortable spacing for long work sessions.
- Minimal visual clutter.
- High readability and accessible contrast.
- Use glass effects sparingly and only where they improve hierarchy.
- Keep operational workflows obvious and fast.

## Token-Efficient Workflow
Use search first, then open only the relevant lines. Example:

```text
Read CODEMAP.md. Edit only the Dashboard screen and the selectors it uses. Preserve all JavaScript behavior. Do not inspect unrelated screens unless a shared class must change.
```
