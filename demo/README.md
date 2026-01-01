Demo — Lumen CSS

This demo shows a minimal, clean UI that demonstrates:

- Light and dark themes (toggle with the moon/sun button)
- Buttons, forms, tables, and cards
- Example customization using CSS variables

How to run

- Open `demo/index.html` directly in your browser (works for quick checks).
- For a better development experience, serve the demo with a static server:

  - Using npm:

    ```bash
    npx http-server demo
    ```

  - Or with Python 3:

    ```bash
    python -m http.server --directory demo 8000
    ```

Files

- `demo/index.html` — demo page
- `demo/styles.css` — demo-specific layout overrides
- `demo/script.js` — theme toggle and persistence (localStorage)

Notes

- The demo uses the built `dist/css/lumen.min.css` file. If you update the source, rebuild the `dist/` file before testing the demo.
