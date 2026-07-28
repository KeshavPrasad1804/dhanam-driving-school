# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **static marketing site** (HTML, CSS, vanilla JavaScript). There is no `package.json`, build step, or backend.

### Running the site

Start a local static file server from the repo root:

```bash
python3 -m http.server 8080
```

Then open **http://localhost:8080** in a browser.

Alternative (if Node/npx is available):

```bash
npx --yes serve /workspace -l 3000
```

### Lint / test

There are no configured linters, test runners, or CI workflows. Manual verification is done by loading the site and exercising navigation, sections, and the booking form (client-side validation + success UI in `script.js`).

### External dependencies (runtime)

- **Google Fonts** (Inter) — optional; system fonts are used if the CDN is blocked.
- **Google Maps embed** — optional; the location section degrades if blocked.
- **WhatsApp / tel / mailto links** — external navigation only.

### Booking form behavior

The booking form does not submit to a server. Valid submissions show a temporary success state on the submit button; invalid submissions show inline errors for name and email.
