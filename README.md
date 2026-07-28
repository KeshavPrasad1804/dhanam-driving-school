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

### Finish GitHub Actions setup (one step left)

A Vercel project is already created. Add these **repository secrets** so workflows can deploy automatically:

GitHub → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|--------|--------|
| `VERCEL_TOKEN` | Your Vercel token ([account tokens](https://vercel.com/account/tokens)) — **do not commit this** |
| `VERCEL_ORG_ID` | `team_4JSK3RUTgDOjUqq25GF4DG6e` |
| `VERCEL_PROJECT_ID` | `prj_WZIYnzocWOsyNykUOeAvkMhxY9mu` |

After saving the secrets, re-run the failed workflow: **Actions → Vercel Production Deployment → Re-run all jobs**.

If you shared a token in chat or a ticket, **revoke it and create a new one** before adding it as a secret.

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
