# Dhanam Driving School Tirunelveli

Static marketing site for Dhanam Driving School — courses, pricing, testimonials, location, and a client-side booking form.

## Local development

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy to Vercel

**Live site:** https://dhanam-driving-school.vercel.app

Production deploys run via **GitHub Actions** when code is pushed to `main` (including after a PR merge). Opening or updating a PR triggers a **preview** deployment.

### Finish GitHub Actions setup (one secret required)

The Vercel org and project IDs are already set in the workflow files. You only need **one** repository secret:

1. Open **https://github.com/KeshavPrasad1804/dhanam-driving-school/settings/secrets/actions**
2. Click **New repository secret**
3. Name: `VERCEL_TOKEN`
4. Value: a Vercel token from [vercel.com/account/tokens](https://vercel.com/account/tokens) (create a new token; do not reuse one posted in chat)

After saving, re-run the failed workflow: **Actions → Vercel Production Deployment → Re-run all jobs**.

Reference IDs (already in workflows, no need to add as secrets):

| Setting | Value |
|---------|--------|
| Vercel team (org) | `team_4JSK3RUTgDOjUqq25GF4DG6e` |
| Vercel project | `prj_WZIYnzocWOsyNykUOeAvkMhxY9mu` |

### Alternative: Vercel Git integration

Instead of GitHub Actions, you can connect the repo in the [Vercel dashboard](https://vercel.com/keshavprasad10000-8223/dhanam-driving-school/settings/git) (requires linking GitHub under Vercel account settings). Vercel will deploy on every push to `main` without Actions secrets. If you use both, disable one to avoid double deploys.

### Workflows

| Workflow | Trigger | Result |
|----------|---------|--------|
| `.github/workflows/vercel-preview.yml` | PR opened / updated | Preview deployment |
| `.github/workflows/vercel-production.yml` | Push to `main` (including after PR merge) | Production deployment |

## Project structure

| Path | Description |
|------|-------------|
| `index.html` | Main page |
| `styles.css` | Styles |
| `script.js` | Navigation, form validation, animations |
| `assets/` | Images |
| `vercel.json` | Vercel static site settings |

## Booking form

The booking form is client-side only. Valid submissions show a success state on the button; nothing is sent to a server.
