# Contributing to Lumen CSS

Thank you for considering contributing — your help improves the project for everyone! This is a short, practical guide to make contributions fast and consistent.

## How to get started

1. Fork the repository and create a feature branch from `main` (e.g., `feat/button-accessibility`).
2. Make small, focused changes and keep commits atomic and descriptive.
3. If your change is non-trivial, open an issue first to discuss the design.

## Development workflow

- Edit source files in `src/` (e.g., `src/css/lumen.css`).
- Build a minified CSS file for distribution and testing (`dist/lumen.min.css`). You can use tools such as `postcss`, `csso`, or any CSS minifier. Example (optional, requires `package.json` and `postcss`):

```bash
# Install postcss and cssnano (one-time)
npm install --save-dev postcss postcss-cli cssnano

# Example build (configure postcss.config.js as needed)
npx postcss src/css/lumen.css -o dist/css/lumen.min.css
```

## Tests and linting

There are no automated tests included yet. If you add code that would benefit from tests (e.g., JS helpers or build scripts), include tests and document how to run them.

## Pull request guidelines

- Target the `main` branch with a descriptive PR title and description.
- Link to the issue the PR addresses, if applicable.
- Include screenshots or examples for visual changes and steps to reproduce.
- Keep changes focused and break large changes into smaller PRs when possible.

## Style and conventions

- Use clear, accessible markup and prefer semantic HTML in examples.
- Keep CSS variables and tokens consistent; add any new variables documented in the code.
- Use English for commit messages and PR descriptions.

## Code of conduct

Please follow a respectful and inclusive Code of Conduct. If this repository does not have one yet, consider adding `CODE_OF_CONDUCT.md` (the Contributor Covenant is a good default).

## License

By contributing, you agree that your contributions will be licensed under the project's MIT license.

---

If you'd like, I can add a `Makefile` or a simple `package.json` with `build` scripts and a GitHub Actions workflow template to help contributors run builds and tests locally.