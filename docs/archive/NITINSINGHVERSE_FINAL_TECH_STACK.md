# NITINSINGHVERSE --- FINAL TECH STACK DOCUMENT

**Version:** 1.0\
**Status:** FINAL / APPROVED FOR IMPLEMENTATION\
**Purpose:** Technical foundation for the nitinsinghverse personal
portfolio.

## 1. Final Stack

  -----------------------------------------------------------------------
  Layer                   Final Technology        Role
  ----------------------- ----------------------- -----------------------
  Framework               **Next.js (App          Public site, routing,
                          Router)**               rendering, server
                                                  functionality

  Language                **TypeScript**          Application language
                                                  and type safety

  Styling                 **Tailwind CSS**        Responsive UI and
                                                  design system

  3D                      **Three.js**            Interactive 3D
                                                  experiences

  3D React layer          **React Three Fiber +   React integration for
                          Drei**                  Three.js experiments

  Backend/API             **Next.js Route         Server-side APIs and
                          Handlers**              business logic

  Database                **Supabase PostgreSQL** Portfolio, CMS,
                                                  analytics and message
                                                  data

  Authentication          **Supabase Auth**       Secure admin
                                                  authentication

  File Storage            **Supabase Storage**    Certificates, badges,
                                                  CV, images, videos and
                                                  assets

  Hosting                 **Vercel**              Production deployment

  Source Control          **GitHub**              Code repository and
                                                  version history

  Email                   **Resend (optional)**   Contact/admin email
                                                  notifications

  Analytics               **Custom first-party    Saved
                          analytics**             visitor/session/event
                                                  data
  -----------------------------------------------------------------------

## 2. Architecture

``` text
                    VISITOR
                       │
                       ▼
                 VERCEL / NEXT.JS
                  │            │
                  ▼            ▼
             PUBLIC SITE    ADMIN PANEL
                  │            │
                  └─────┬──────┘
                        ▼
                 NEXT.JS APIs
                        │
                        ▼
                    SUPABASE
              ┌─────────┼─────────┐
              │         │         │
          PostgreSQL   Auth     Storage
```

The system will be request-driven/serverless. It will **not depend on an
always-running Node.js server**.

## 3. Why Next.js

Next.js is the final framework because this project needs:

-   SEO-friendly public pages
-   structured routing
-   dynamic project/case-study pages
-   server-side functionality
-   API/Route Handlers
-   admin + public application in one codebase
-   strong Vercel deployment compatibility

## 4. Why TypeScript

TypeScript is mandatory for the application code to improve:

-   maintainability
-   type safety
-   database/API contracts
-   refactoring safety
-   scalability of the admin CMS

## 5. UI Stack

**Tailwind CSS** is the primary styling system.

Design goals: - dark/futuristic/premium visual identity - mobile-first
responsive layouts - reusable components - consistent spacing and
typography - no horizontal scrolling

## 6. Three.js Strategy

Three.js is a feature layer, not the entire website.

**React Three Fiber + Drei** will be used where React integration makes
the 3D experience easier to maintain.

### Desktop

-   richer hero 3D
-   interactive 3D experiments
-   particle/scene effects where useful

### Mobile

-   reduced complexity
-   lower particle counts
-   simplified scenes
-   fallback when device performance requires it

**Rule:** 3D must enhance the portfolio, never become the reason the
portfolio is slow.

## 7. Backend

There will be no separate always-running Express server for the initial
portfolio.

Backend functionality will use **Next.js Route Handlers** deployed
through Vercel.

Responsibilities include: - admin CRUD operations - contact handling -
visitor events - notifications - media metadata - settings - health
diagnostics

## 8. Database

**Supabase PostgreSQL** is the final database.

Core data areas: - profile/about - skills and categories - projects and
case studies - project images - certifications - badges - education -
experience - achievements - learning journey - GitHub repositories -
resume versions - contact messages - visitor sessions/events -
notifications - site settings - media metadata

## 9. Authentication

**Supabase Auth** will protect the Portfolio Forge admin panel.

Requirements: - authenticated admin access - protected admin routes -
server-side authorization checks - secure database policies -
logout/session handling - no credentials hard-coded in frontend code

## 10. Storage

**Supabase Storage** will hold uploaded media.

Categories: - profile - projects - certificates - badges - resume -
education/experience - achievements - 3D assets - SEO/social images

A reusable Media Library will prevent duplicate uploads.

## 11. Health Route

A public health endpoint may be included for diagnostics and deployment
verification.

It can be used to verify basic application/database health without
exposing sensitive internals.

### Critical rule

**Health route is NOT a keep-alive mechanism.**

No scheduled ping will be used merely to keep the application awake.

## 12. Visitor Analytics

The portfolio will not implement a realtime visitor counter.

Instead, visitor/session/event information will be saved for the admin
dashboard.

Useful events include: - portfolio visit - project opened - Mood Wala
opened - resume viewed/downloaded - GitHub clicked - LinkedIn clicked -
contact submitted

Analytics should remain privacy-conscious and should not claim to
identify a person unless the person voluntarily provides identifying
information.

## 13. Notifications

Notifications are stored for the admin.

Examples: - new visitor - resume interaction - project interaction - new
contact message

Notifications should focus on meaningful events rather than every
pageview.

## 14. Email

**Resend is optional**, not a core dependency for the first build.

The contact system will first save messages in Supabase. Email
notification can be added without redesigning the database.

## 15. Deployment

``` text
GitHub
   ↓
Vercel
   ↓
Next.js Application
   ↓
Supabase
```

Initial deployment will use the Vercel URL. A custom domain is optional
for a later phase.

## 16. Environment & Secrets

Secrets and service configuration must use environment variables.

Never commit: - database secrets - service-role keys - authentication
secrets - email API keys - other private credentials

## 17. Performance Rules

-   mobile-first implementation
-   lazy-load heavy content
-   optimize images
-   compress 3D assets
-   minimize unnecessary JavaScript
-   avoid unnecessary animations
-   provide reduced-motion behavior
-   use responsive 3D quality
-   avoid loading every 3D experiment on the homepage

## 18. Security Rules

-   Supabase Row Level Security
-   protected admin routes
-   server-side authorization
-   input validation
-   secure file policies
-   environment variables for secrets
-   no sensitive analytics exposed publicly
-   appropriate rate limiting/abuse protection for public forms

## 19. SEO Stack Requirements

Next.js implementation must support: - page titles - meta descriptions -
canonical URLs - Open Graph metadata - sitemap - robots.txt - semantic
HTML - structured data where appropriate - indexable project/case-study
pages

Primary identity: **Nitin Singh / nitinsinghverse**.

## 20. Browser & Device Priority

Primary testing targets: - Chrome desktop - Chrome Android - Safari
iPhone - Edge desktop - Firefox desktop

Mobile must not be treated as a reduced desktop layout.

## 21. Development Rules

1.  Documentation is the source of truth.
2.  No coding before requirements are approved.
3.  Implement one feature at a time.
4.  Inspect existing structure before changing it.
5.  Do not modify unrelated files/features.
6.  Test desktop and mobile after UI changes.
7.  Commit meaningful changes to Git.
8.  Keep performance in mind for every Three.js feature.

## 22. Final Decision

### LOCKED STACK

**Next.js + TypeScript + Tailwind CSS + Three.js + React Three
Fiber/Drei + Next.js Route Handlers + Supabase PostgreSQL + Supabase
Auth + Supabase Storage + Vercel + GitHub**

**Optional:** Resend for email notifications.

This is the approved technical foundation for the nitinsinghverse
portfolio. Any future technology change should be treated as an
architecture decision and documented before implementation.
