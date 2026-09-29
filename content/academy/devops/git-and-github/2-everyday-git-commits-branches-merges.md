---
title: "Everyday Git: commits, branches and merges"
slug: everyday-git-commits-branches-merges
track: devops
module: git-and-github
order: 2
level: beginner
roles: [devops, dev]
duration: 15 min
prerequisites: [what-is-git]
objectives:
  - Make small, well-described commits and read the history
  - Create branches to work on features in isolation
  - Merge branches and resolve a merge conflict
  - Undo mistakes safely
updated: "2026-09-29"
authors: [kodesec-research]
---

Most of a developer's day with Git uses about ten commands. This lesson covers them: recording changes, working on branches, combining branches, and undoing mistakes without losing work.

## Recording changes

The everyday loop is **edit → check → stage → commit**:

```bash
git status                 # what changed?
git diff                   # the exact lines changed (not yet staged)
git add src/login.js       # stage one file…
git add -p                 # …or pick individual changes, hunk by hunk
git diff --staged          # review exactly what will be committed
git commit -m "Fix login redirect after password reset"
```

### What makes a good commit

- **Small and focused.** One logical change per commit. "Fix login redirect" is easy to review and to revert. "Various fixes" is neither.
- **A message that explains why.** The diff already shows *what* changed. The message should say *why*, in the imperative: "Add rate limit to password reset", not "added stuff".
- **Working code.** Each commit should leave the project in a state that builds and passes its tests.

To read the history:

```bash
git log --oneline --graph --all   # compact history with branches drawn
git show a1b2c3d                   # one commit in full
git blame src/login.js             # who last changed each line, and in which commit
```

## Branches

A **branch** is an independent line of work. The main line is usually called `main`. When you start a feature or fix, you create a branch from `main`, commit there, and `main` stays untouched until the work is finished and reviewed.

```bash
git switch -c feature/password-reset   # create a branch and move to it
# …edit, add, commit as usual…
git switch main                         # go back to main
git branch                              # list branches; * marks the current one
```

Branches in Git are extremely cheap. A branch is just a movable label that points at a commit, so creating one is instant, even in a huge project. Use one for every piece of work.

```text
main:                 A───B───────────E  (merge)
                           \         /
feature/password-reset:     C───D───┘
```

## Merging

When a feature is done, you **merge** its branch back into `main`:

```bash
git switch main
git merge feature/password-reset
git branch -d feature/password-reset   # delete the label; the commits stay in history
```

In teams, this merge usually happens on GitHub through a **pull request**, after review. Lesson 3 covers that.

## Merge conflicts

Git combines changes automatically when they touch different lines. If two branches changed **the same lines** differently, Git can't know which one is right, so it stops and asks you. This is a **merge conflict**, and it's normal.

Git marks the conflict inside the file:

```text
<<<<<<< HEAD
const timeout = 30;
=======
const timeout = 60;
>>>>>>> feature/password-reset
```

To resolve it:

1. Open the file and decide what the code should be: one side, the other, or a combination.
2. Delete the `<<<<<<<`, `=======` and `>>>>>>>` marker lines.
3. Stage the file and finish the merge:

```bash
git add src/config.js
git commit                 # Git pre-fills a merge message
```

If you want to start over, `git merge --abort` puts everything back to how it was before the merge.

> [!TIP]
> Conflicts are smaller and rarer when branches are short-lived. Merge small pieces of work often instead of keeping a branch open for weeks.

## Undoing mistakes

| Situation | Command | Safe on shared branches? |
|---|---|---|
| Discard unsaved edits to a file | `git restore src/app.js` | Yes (only affects your working copy) |
| Unstage a file (keep the edits) | `git restore --staged src/app.js` | Yes |
| Fix the last commit's message or add a forgotten file | `git commit --amend` | Only if you haven't pushed it yet |
| Undo a commit that's already shared | `git revert a1b2c3d` | **Yes**: adds a new commit that reverses it |
| Move back to an earlier commit, dropping later ones | `git reset --hard a1b2c3d` | **No**: rewrites history and loses work |

> [!WARNING]
> Never rewrite history that others have already pulled: that means `reset`, `commit --amend` and force-pushing on a shared branch. Use `git revert` instead. It undoes the change while keeping the history honest.

## Keeping secrets out of Git

Some files should never be committed: passwords, API keys, `.env` files, build output and dependency folders. List them in a `.gitignore` file at the root of the repo:

```text
.env
.env.*
node_modules/
dist/
*.log
```

> [!CAUTION]
> If a secret is ever committed, **treat it as leaked and rotate it immediately**, even if you delete the commit. Git keeps history, clones and forks keep copies, and bots scan public repositories for keys within minutes.

> [!TIP]
> Next: [Collaborating on GitHub](/academy/devops/git-and-github/collaborating-on-github) — pushing, pull requests, reviews and protecting `main`.
