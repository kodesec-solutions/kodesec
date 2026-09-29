---
title: "Collaborating on GitHub: pull requests and protected branches"
slug: collaborating-on-github
track: devops
module: git-and-github
order: 3
level: beginner
roles: [devops, dev]
duration: 15 min
prerequisites: [everyday-git-commits-branches-merges]
objectives:
  - Connect a local repository to GitHub and keep it in sync
  - Use the pull request workflow to review and merge changes
  - Protect the main branch with required reviews and checks
  - Apply basic security settings to a GitHub organisation
updated: "2026-09-29"
authors: [kodesec-research]
---

GitHub turns Git from a personal tool into a team workflow. Everyone shares one central copy of the repository, every change is proposed as a **pull request**, and nothing reaches `main` until it has been reviewed and has passed automated checks.

## Remotes: your repo on GitHub

A **remote** is a copy of the repository hosted elsewhere. By convention the main one is called `origin`.

To start from an existing GitHub project:

```bash
git clone https://github.com/your-org/your-project.git
cd your-project
git remote -v        # shows where origin points
```

To publish a project you created locally, create an empty repository on GitHub first, then:

```bash
git remote add origin https://github.com/your-org/your-project.git
git push -u origin main    # -u remembers the link, so next time `git push` is enough
```

## Staying in sync

Four commands move commits between your machine and GitHub:

| Command | What it does |
|---|---|
| `git fetch` | Downloads new commits from GitHub, **without** changing your files |
| `git pull` | `fetch` plus merging those commits into your current branch |
| `git push` | Uploads your commits to GitHub |
| `git push -u origin feature/x` | Publishes a new branch for the first time |

Pull before you start work each day, and push your branch regularly. It's your backup and lets teammates see your progress.

## The pull request workflow

A **pull request** (PR) is a proposal: "please merge my branch into `main`". It's where review, discussion and automated testing happen. The standard flow:

```text
1. git switch -c fix/login-timeout      create a branch
2. edit, commit, commit                 do the work in small commits
3. git push -u origin fix/login-timeout publish the branch
4. Open a pull request on GitHub        describe what changed and why
5. CI runs, teammates review            fix anything they find, push again
6. Merge                                the change lands on main
7. Delete the branch                    keep the repo tidy
```

### Writing a good pull request

- **Title:** what the change does, e.g. "Increase login timeout to 60 seconds".
- **Description:** why it's needed, how you tested it, and anything reviewers should look at closely. Link the related issue.
- **Size:** small PRs get fast, careful reviews. A 2,000-line PR gets a quick "looks good to me" and hides bugs.

### Reviewing someone else's

Read the code for correctness first, then clarity. Comment on specific lines, ask questions instead of giving orders, and approve when it's ready. **Request changes** when something must be fixed before merging.

### Merge options

| Option | Result | Good for |
|---|---|---|
| Merge commit | Keeps every commit plus a merge commit | Preserving detailed history |
| **Squash and merge** | Combines the PR into one commit on `main` | A clean, readable `main` history (a popular default) |
| Rebase and merge | Replays the commits onto `main` without a merge commit | Linear history with each commit kept |

## Protecting `main`

`main` is usually what gets deployed, so nobody should be able to push broken or unreviewed code to it directly. In **Settings → Branches** (or **Rules → Rulesets**), protect `main` with:

- **Require a pull request before merging**, with at least one approval
- **Require status checks to pass**: your CI tests, linting and build
- **Block force pushes** and **block deletion**
- Optionally, **require review from code owners**: a `CODEOWNERS` file names who must approve changes to sensitive paths

```text
# .github/CODEOWNERS
/.github/     @your-org/platform-team
/infra/       @your-org/platform-team
*.tf          @your-org/platform-team
```

## GitHub Actions in one paragraph

**GitHub Actions** runs automated jobs when something happens in the repo. A workflow file in `.github/workflows/` can run your tests on every pull request and deploy when `main` changes:

```yaml
name: CI
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm test
```

Combined with a protected `main` that requires this check, broken code can't be merged.

## Security basics for a GitHub organisation

- **Require two-factor authentication** for every member (organisation settings), and prefer passkeys or security keys.
- **Least privilege:** give people *write* access, not *admin*, unless they manage the repo.
- **Turn on secret scanning and push protection.** GitHub blocks pushes that contain known key formats.
- **Turn on Dependabot** alerts and updates, so vulnerable dependencies are flagged and patched.
- **Review third-party Actions and apps** before installing them. They can run with access to your code.
- **Remove access promptly** when someone leaves the team.

## Checklist

- [ ] Every change goes through a branch and a pull request
- [ ] `main` requires a review and passing CI, with force-push blocked
- [ ] `.gitignore` covers secrets, `.env` files and build output
- [ ] 2FA is required across the organisation
- [ ] Secret scanning, push protection and Dependabot are on

> [!TIP]
> Setting up pipelines, branch rules and secure deployments for a team? That's what our [DevOps services](/services/devops) cover.
