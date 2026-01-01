# Lumen CSS ✨

![License: MIT](https://img.shields.io/badge/license-MIT-green.svg) ![Version](https://img.shields.io/badge/v-0.0.1-blue.svg) ![Build](https://img.shields.io/github/actions/workflow/status/OWNER/REPO/ci.yml?branch=main) ![npm](https://img.shields.io/badge/npm-not_published-lightgrey.svg)

A modern, lightweight CSS system with sensible defaults, accessible components, and flexible design tokens for building clean interfaces.

---

## Table of Contents

- [What is Lumen CSS?](#what-is-lumen-css)
- [Why choose it](#why-choose-it)
- [Quick start](#quick-start)
- [Usage examples](#usage-examples)
- [Customization](#customization)
- [Demo](#demo)
- [CI & publishing](#ci--publishing)
- [Contributing](#contributing)
- [Support & Security](#support--security)
- [License](#license)

---

## What is Lumen CSS? 🔧

Lumen CSS is a compact stylesheet that provides:

- Opinionated, accessible defaults for typography, forms, tables, and components.
- Dark-mode support and theme tokens via CSS variables (`data-theme`).
- A single-file distribution at `dist/lumen.min.css` for quick inclusion.

Files to know:

- `src/css/lumen.css` — source (human-readable)
- `dist/lumen.min.css` — minified build (ready to include)
- `LICENSE` — project license (MIT)

---

## Why choose it ✅

- Focused and small: low cognitive and payload overhead.
- Themeable: tweak colors and spacing using CSS variables.
- Accessibility-minded: `focus-visible`, reduced-motion, and semantic defaults.

---

## Quick start — Get started in seconds 🚀

### 1) Add the CSS (local)

```html
<link rel="stylesheet" href="dist/lumen.min.css">
```

### 2) Use via CDN (replace OWNER/REPO)

```html
<!-- Replace OWNER/REPO and tag/branch as needed -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/OWNER/REPO@main/dist/lumen.min.css">
```

### 3) Install from npm (if published)

```bash
npm install lumen-css
# then import in your app
import 'lumen-css/dist/lumen.min.css';
```

---

## Usage examples 🧩

Minimal HTML:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="dist/lumen.min.css">
  <title>Demo</title>
</head>
<body>
  <main class="container">
    <h1>Welcome</h1>
    <p>Simple, accessible defaults.</p>
    <button class="btn">Primary</button>
  </main>
</body>
</html>
```

Theme toggle example:

```html
<button aria-pressed="false" onclick="document.documentElement.setAttribute('data-theme','dark')">Dark</button>
```

---

## Customization 🔧

Lumen exposes CSS variables for easy theming. Example: change primary color and border radius

```css
:root {
  --lumen-primary: #e54b4b;
  --lumen-border-radius: 0.5rem;
}
```

Search for `--lumen-` variables in `src/css/lumen.css` to discover tokens for colors, spacing, and component states.

---

## Demo 🚀

Open `demo/index.html` in your browser to view a living demo showcasing light/dark themes, accessible defaults, and common components. For local testing, serve the demo folder with a static server (recommended):

```bash
# Using a simple static server
npx http-server demo
# or
python -m http.server --directory demo 8000
```

---

## CI & publishing ⚙️

Recommendations to make the project production-ready:

- Add a GitHub Actions workflow (`.github/workflows/ci.yml`) to run linting and the build on PRs.
- Add a `package.json` and include `dist/` in `files` to publish a distributable package to npm.

Starter GitHub Actions snippet:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '18' }
      - run: echo "Add 'npm ci && npm run build' here"
```

> Replace `OWNER/REPO` with your repository path to enable accurate badges (build, releases, npm).

---

## Contributing 🤝

Thanks for helping — contributions are welcome!

- See `CONTRIBUTING.md` for the recommended workflow, branch naming, and build steps.
- Open issues for bugs or feature requests and reference them in PRs.

If you'd like, I can scaffold a GitHub Actions workflow, `package.json` with `build` scripts, and a release workflow for npm publishing — tell me which you'd prefer.

---

## Support & Security 🔒

- Report bugs or security issues by opening an issue in this repository.
- For security-sensitive issues, prefer contacting a maintainer or using GitHub's private report flow (if available).

---

## License 📄

Lumen CSS is available under the MIT License — see `LICENSE` for details.

---

Made with ⚡ and a focus on accessible defaults. Contributions welcome!