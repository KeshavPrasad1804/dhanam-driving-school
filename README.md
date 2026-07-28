# Dhanam Driving School Tirunelveli

Static marketing site for Dhanam Driving School — courses, pricing, testimonials, location, and a client-side booking form.

## Local development

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Deploy to Vercel (automatic on merge)

Production deploys run via **GitHub Actions** when a pull request is merged into `main`. Opening or updating a PR triggers a **preview** deployment.

### One-time setup

#### 1. Create a Vercel project

**Option A — Vercel dashboard (recommended)**

1. Go to [vercel.com/new](https://vercel.com/new) and import `KeshavPrasad1804/dhanam-driving-school`.
2. Leave the framework preset as static / Other (no build command).
3. **Disable** Vercel’s built-in “Deploy on push” Git integration if you only want GitHub Actions to deploy (Project → Settings → Git → disconnect, or turn off automatic deployments). Otherwise both Vercel Git hooks and Actions may deploy on each push.

**Option B — Vercel CLI**

```bash
npx vercel@latest login
npx vercel@latest link
```

This creates `.vercel/project.json` locally (do not commit this file).

#### 2. Create a Vercel access token

1. Open [vercel.com/account/tokens](https://vercel.com/account/tokens).
2. Create a token with access to the team/account that owns the project.

#### 3. Add GitHub repository secrets

In GitHub: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|--------|--------|
| `VERCEL_TOKEN` | Token from step 2 |
| `VERCEL_ORG_ID` | `orgId` from `.vercel/project.json` or Vercel project settings |
| `VERCEL_PROJECT_ID` | `projectId` from `.vercel/project.json` or Vercel project settings |

To read IDs from a linked project:

```bash
cat .vercel/project.json
```

#### 4. Merge and verify

1. Merge your PR into `main`.
2. Open **Actions** in GitHub and confirm **Vercel Production Deployment** succeeds.
3. Open the production URL in the Vercel dashboard (e.g. `https://dhanam-driving-school.vercel.app`).

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
