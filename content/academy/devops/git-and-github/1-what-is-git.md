---
title: What is Git, and why every team uses it
slug: what-is-git
track: devops
module: git-and-github
order: 1
level: beginner
roles: [devops, dev]
duration: 10 min
prerequisites: []
objectives:
  - Explain what version control is and the problems it solves
  - Describe the difference between Git and GitHub
  - "Understand Git's three areas: working directory, staging area and repository"
updated: "2026-09-29"
authors: [kodesec-research]
---

Git is a **version control system**: a tool that records every change to a set of files, who made it and why, so you can go back to any earlier version at any time. It's the standard way software teams work. Almost every job in development, DevOps or security expects you to use it daily.

## The problem Git solves

Without version control, teams end up with folders like `website-final`, `website-final-v2` and `website-final-REALLY-final`. Nobody knows which copy is current, what changed between them, or how to undo a bad change.

Git replaces all of that with **one project folder and a complete history inside it**. Every saved version (a *commit*) records:

- exactly which lines changed
- who changed them and when
- a message explaining why

That gives you three things you can't get any other way:

1. **Undo.** A change that broke the site can be reverted in seconds.
2. **Parallel work.** Two people can work on different features at the same time and combine them later.
3. **Accountability.** When a bug appears, you can find the exact change, and the reasoning, that introduced it.

> [!NOTE]
> Git was created by Linus Torvalds in 2005 to manage the Linux kernel, one of the largest collaborative codebases in the world. It's free and open source.

## Git is not GitHub

These two are easy to confuse:

| | Git | GitHub |
|---|---|---|
| What it is | A program that runs on your computer | A website that hosts Git repositories |
| Works offline | Yes | No |
| Main job | Recording history | Sharing history, reviewing changes, automation |
| Alternatives | (Git is the standard) | GitLab, Bitbucket, Azure DevOps |

You can use Git without GitHub. GitHub adds the team features on top: pull requests, code review, issues and GitHub Actions for automated testing and deployment. Lesson 3 covers them.

## Git is distributed

Git is a **distributed** version control system. Every person who clones a project gets the **entire history** on their own machine, not just the latest files. So:

- you can commit, browse history and create branches with no internet connection
- there's no single point of failure: every clone is a full backup
- sharing happens deliberately, when you *push* your commits or *pull* someone else's

## The three areas

Git's commands are much easier once you know where your changes live. Every change moves through three areas:

```text
 working directory  ──git add──▶  staging area  ──git commit──▶  repository (history)
 (files you edit)                 (what goes into                (saved snapshots)
                                   the next commit)
```

- **Working directory:** the normal files you open and edit.
- **Staging area** (also called the *index*): a draft of your next commit. You choose exactly which changes go in.
- **Repository:** the permanent history, stored in a hidden `.git` folder inside your project.

The staging area is what makes clean history possible. If you fixed a bug and also tidied some unrelated formatting, you can commit them **separately**, so each commit does one clear thing.

## Your first repository

Install Git from [git-scm.com](https://git-scm.com), then tell it who you are. This identity is attached to every commit you make:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Create a project and turn it into a repository:

```bash
mkdir my-project && cd my-project
git init                      # creates the hidden .git folder
echo "# My project" > README.md
git status                    # README.md is "untracked"
git add README.md             # move it to the staging area
git commit -m "Add README"    # save the snapshot
git log --oneline             # see the history
```

`git status` is the command you'll run most. It tells you what has changed, what's staged, and usually which command to run next.

## Key terms

| Term | Meaning |
|---|---|
| Repository (repo) | A project folder plus its full history |
| Commit | One saved snapshot, with an ID (hash), author, date and message |
| Branch | A separate line of work (lesson 2) |
| Remote | A copy of the repo somewhere else, usually GitHub (lesson 3) |
| Clone | Download a full copy of a remote repository |

> [!TIP]
> Next: in [Everyday Git](/academy/devops/git-and-github/everyday-git-commits-branches-merges) you'll make commits, work on branches and combine them.
