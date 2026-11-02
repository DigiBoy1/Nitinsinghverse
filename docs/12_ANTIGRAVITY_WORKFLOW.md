# 12 --- Antigravity Workflow

## Purpose

This document defines how Antigravity IDE should be used so that
AI-assisted development remains predictable and controlled.

## Source of truth

Always read: - 00_MASTER_SPECIFICATION.md - the relevant detailed
document(s)

Do not infer requirements that are not documented.

## Standard task lifecycle

### Step 1 --- Inspect

Read relevant files and existing implementation.

### Step 2 --- Plan

Explain the smallest set of changes required.

### Step 3 --- Implement

Modify only the required area.

### Step 4 --- Validate

Run/build/test relevant functionality.

### Step 5 --- Report

Return: - changed files - what changed - tests performed - issues
found - unresolved items

## Prompt template

CONTEXT: \[Short project context\]

SOURCE OF TRUTH: \[Exact documentation files to follow\]

TASK: \[One clear objective\]

CONSTRAINTS: \[What must not change\]

IMPLEMENTATION RULES: \[Specific behaviour\]

ACCEPTANCE CRITERIA: \[Observable definition of done\]

VALIDATION: \[Tests/checks\]

OUTPUT: \[What the AI must report\]

## Example task

Read the master specification and the admin/project documentation before
making changes.

Implement only the Projects management module.

Do not modify unrelated public UI, authentication architecture or
unrelated database entities.

Support create, edit, delete/archive as defined, draft, publish,
visibility, featured state and ordering.

Validate CRUD operations, responsive admin UI, error states and
permission protection.

Report changed files, validation performed and unresolved issues.

## Rules

1.  One task = one clear objective.
2.  Inspect before modifying.
3.  Do not rewrite unrelated files.
4.  Do not change architecture without approval.
5.  Do not invent content.
6.  Preserve working functionality.
7.  Ask/report when requirements conflict.
8.  Use small incremental changes.
9.  Commit after stable milestones.
10. Test both desktop and mobile for UI work.

## Bad vs good prompts

Bad: "Make the admin panel better."

Good: "Improve only the certificate management form. Follow
07_ADMIN_PORTFOLIO_FORGE.md and 09_FEATURE_SPECIFICATIONS.md. Keep all
existing navigation and unrelated modules unchanged. Add the required
metadata fields, validation, preview and save states. Test mobile and
desktop layouts."

## Git workflow

Recommended milestone commits: - project-foundation - architecture -
database - admin-auth - admin-content - public-portfolio - projects -
certificates - analytics - threejs - seo-performance - testing -
deployment

Names can be adapted to the actual repository.

## Recovery rule

If an AI change causes regression: 1. Stop adding more changes. 2.
Inspect the diff. 3. Identify the regression. 4. Revert/restore the
smallest affected change. 5. Re-run validation. 6. Only then continue.

## Efficiency tips

-   Keep documentation in the repository so the IDE can access it.
-   Give Antigravity only the relevant documents for each task.
-   Prefer small tasks over giant prompts.
-   Ask for a plan before risky architectural changes.
-   Ask it to list files it will change before major work.
-   Make acceptance criteria measurable.
-   Use screenshots for UI bugs when possible.
-   Test at real mobile widths.
-   Keep a CHANGELOG/decision log after major architectural decisions.
-   Never let the AI silently replace a chosen technology.
-   Periodically ask for a consistency audit against the master
    specification.
