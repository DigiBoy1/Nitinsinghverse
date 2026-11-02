# 11 --- Deployment

## Initial cost target

**₹0**

## Initial architecture

GitHub → Vercel → Portfolio + appropriate API/backend functions →
Supabase

## Responsibilities

### GitHub

-   Source code
-   Version control
-   Branches/commits
-   Collaboration/history

### Vercel

-   Production hosting
-   Preview deployments
-   Suitable server/API functions
-   HTTPS

### Supabase

-   PostgreSQL
-   Authentication
-   Storage

## Deployment process

1.  Create repository.
2.  Configure application locally.
3.  Create Supabase project.
4.  Configure database and policies.
5.  Configure storage.
6.  Configure environment variables.
7.  Connect repository to Vercel.
8.  Deploy preview.
9.  Test admin.
10. Test public site.
11. Test mobile.
12. Promote to production.

## Domain

Do not purchase a custom domain initially. Use the free Vercel domain
until the portfolio is stable.

## Environment variables

Secrets must never be committed to GitHub.

Maintain separate values for local/preview/production when required.

## Backups

Portfolio data and media should have a documented backup/export strategy
before major production changes.

## Rollback

Every major feature should have a clean Git commit so broken deployments
can be reverted safely.
