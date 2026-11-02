# NITINSINGHVERSE — ANTIGRAVITY MASTER IMPLEMENTATION PLAN
Version: 1.0
Status: READY AFTER DOCUMENT APPROVAL

## Golden Rule
Do not begin implementation until the approved documentation is treated as the source of truth.

## Phase 0 — Repository Inspection
- inspect existing repository
- confirm framework/tooling
- identify reusable assets
- do not overwrite unrelated work
- report findings before major changes

## Phase 1 — Project Foundation
- initialize/confirm Next.js App Router
- TypeScript
- Tailwind/design tokens
- lint/format conventions
- environment configuration
- base layouts
- error/loading boundaries

## Phase 2 — Supabase Foundation
- project configuration
- database schema
- migrations
- RLS
- Auth
- Storage buckets/policies
- seed/initial admin configuration

## Phase 3 — Backend/API
Implement only documented API contracts.
- public content APIs
- admin CRUD
- contact
- analytics events
- notifications
- media
- health diagnostics

Health route must not be used as keep-alive.

## Phase 4 — Portfolio Forge
Build:
- dashboard
- content management
- ordering
- visibility
- drafts/publish
- media library
- messages
- notifications
- analytics

## Phase 5 — Public Portfolio
[COMPLETED]
Build sections according to UI/UX documentation:
- navbar
- hero
- about
- what I build
- projects
- skills
- AI/ML
- GenAI
- 3D Lab
- certificates
- badges
- education
- experience
- achievements
- learning journey
- GitHub
- resume
- contact

## Phase 6 — Mood Wala Case Study
Create a strong case-study page based only on verified project facts.

## Phase 7 — Three.js
- hero scene
- optimized 3D Lab
- responsive quality
- mobile fallback/reduction
- lazy loading

## Phase 8 — Analytics & Notifications
- session/event recording
- saved admin analytics
- meaningful notifications
- privacy-conscious implementation

## Phase 9 — SEO
- metadata
- canonical
- sitemap
- robots
- OG
- semantic HTML
- structured data where appropriate

## Phase 10 — QA
Use QA Test Plan.
Fix critical issues before release.

## Phase 11 — Performance
- image optimization
- code splitting/lazy loading
- 3D optimization
- mobile testing
- reduced motion

## Phase 12 — Deployment
GitHub → Vercel → Supabase.
Verify production environment and health diagnostics.

## Antigravity Working Protocol
For every task:
1. State objective.
2. Inspect relevant files.
3. Make only requested changes.
4. Preserve unrelated functionality.
5. Test affected desktop/mobile flows.
6. Report changed files.
7. Report tests.
8. Do not silently redesign.

## Prompt Template
OBJECTIVE:
[one clear task]

CONTEXT:
[relevant documentation]

CONSTRAINTS:
[what must not change]

ACCEPTANCE CRITERIA:
[measurable expected result]

TEST:
[desktop/mobile/browser checks]

REPORT:
[files changed + tests + issues]

## Completion Definition
A phase is complete only when:
- documented requirements are implemented
- acceptance criteria pass
- mobile/desktop behavior is checked
- no critical regression is known
- changes are committed with a meaningful Git message
