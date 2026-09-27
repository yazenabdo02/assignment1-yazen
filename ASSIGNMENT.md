# Assignment 1 — Improve the Status Board pipelines

**Project:** `statusboard-backend` (in this zip). It already has a working multi-job CI and a CD that deploys to IIS with backup/health-check/rollback/release. **Your job is to make the pipelines better** — only edit `.github/workflows/**` and repo Settings. No application code changes.

**How to submit (GitHub):**
1. Create a **new repository in your GitHub account** (or the class org), e.g. `assignment1-<yourname>`.
2. Unzip this project and push it to that repo (`git init` → commit → `git remote add origin <your-repo-url>` → `git push -u origin main`).
3. Do **each task on its own branch → open a Pull Request → merge** it. Keep commit messages clear.
4. **Submit the repository URL** (and the links to your PRs) in the LMS. Make sure the instructor can see it — either make the repo **public**, or add the instructor as a **collaborator**.
5. CI must be green and each task briefly explained in its PR description (2–3 lines).

---

## Task 1 — Test on a build matrix (15%)
Make the CI `test` job run on **Node 18 and Node 20** with `strategy.matrix`.
**Verify:** the run shows `test (18)` and `test (20)`, both green.

## Task 2 — Move CD config to GitHub Variables (20%)
Right now `cd.yml` hardcodes its `env:` block (`SITE_PATH`, `BACKUP_ROOT`, `APP_POOL`, `HEALTH_URL`, `KEEP_BACKUPS`). Move them into **repository Variables** and reference them.
1. Repo → **Settings → Secrets and variables → Actions → Variables** → add each name/value.
2. In `cd.yml` change the block to read from `vars`:
   ```yaml
   env:
     SITE_PATH: ${{ vars.SITE_PATH }}
     BACKUP_ROOT: ${{ vars.BACKUP_ROOT }}
     APP_POOL: ${{ vars.APP_POOL }}
     HEALTH_URL: ${{ vars.HEALTH_URL }}
     KEEP_BACKUPS: ${{ vars.KEEP_BACKUPS }}
   ```
**Verify:** a deploy still works with the same values, now sourced from Variables (nothing hardcoded in the YAML). *Create the Variables first, or the paths resolve to empty.*

## Task 3 — Manual approval before deploy (15%)
Create a GitHub **Environment** `production` with **yourself as a required reviewer**, and add `environment: production` to the CD `deploy` job.
**Verify:** CD **pauses for approval** and only deploys after you click **Approve**.

## Task 4 — No overlapping deploys + safety timeout (15%)
Add a top-level `concurrency` group to `cd.yml` (`cancel-in-progress: false`) and `timeout-minutes` on the `deploy` job.
**Verify:** a second CD run **queues** behind the first; the deploy job shows the timeout.

## Task 5 — Deploy summary + artifact retention (15%)
- At the end of the CD `deploy` job, write a one-line summary to `$GITHUB_STEP_SUMMARY` (e.g. `Deployed vX.Y.Z at <time>`).
- In `ci.yml`, add `retention-days: 7` to the `upload-artifact` step(s).
**Verify:** the CD run's **Summary** page shows your deploy line; the coverage artifact shows a 7-day expiry.

## Task 6 — Enforce it with branch protection (10%)
On `main`, add a ruleset: **require a pull request + 1 approval** and **require the CI status checks** to pass.
**Verify:** a direct push to `main` is rejected, and a PR can't merge until CI is green + approved.

## Stretch — pick ONE (10%)
- `paths-ignore: ['**/*.md']` under `on: push:` so doc-only changes skip CI.
- Add a `lint`/`format` gate and make it a required check.
- Cache is already on via `setup-node cache: npm` — instead, add a step that prints the cache hit/miss and explain it.

---

## Grading
| Task | Weight |
|---|---|
| 1 — build matrix | 15% |
| 2 — CD config via GitHub Variables | 20% |
| 3 — approval gate (environment) | 15% |
| 4 — concurrency + timeout | 15% |
| 5 — deploy summary + artifact retention | 15% |
| 6 — branch protection enforced | 10% |
| Stretch | 10% |

## Rules
- Only touch `.github/workflows/**` and repo Settings (Variables / Environments / Rulesets).
- One task per commit, clear messages; CI green before requesting review.
- No secrets or config values hardcoded in the YAML after Task 2.
