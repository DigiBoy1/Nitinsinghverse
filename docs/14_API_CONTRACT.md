# NITINSINGHVERSE — API CONTRACT
Version: 1.0
Status: IMPLEMENTATION-READY

## Purpose
Define the public/admin API boundaries before coding.

## Rules
- Next.js Route Handlers are the backend boundary.
- Public endpoints expose only intentionally public data.
- Admin endpoints require authenticated admin access.
- Validate all input server-side.
- Never expose service-role keys or private analytics/contact data.
- Return consistent JSON shapes and HTTP status codes.
- API changes must be documented before implementation.

## Public API Areas
- GET public site settings
- GET published profile/about
- GET published skills/categories
- GET published projects
- GET published project by slug
- GET published certifications
- GET published badges
- GET published education
- GET published experience
- GET published achievements
- GET published learning journey
- GET published GitHub highlights
- GET active resume metadata
- POST visitor session/event
- POST contact message
- GET health diagnostics

## Admin API Areas
- CRUD profile/about
- CRUD skills/categories
- CRUD projects/case studies/images
- CRUD certifications/badges
- CRUD education/experience/achievements
- CRUD learning journey/GitHub highlights
- CRUD resume versions
- CRUD site settings
- CRUD media metadata
- Read/update contact messages
- Read visitor analytics
- Read/mark notifications
- Publish/unpublish and reorder content

## Response Convention
Success:
- `success`
- `data`
- optional `meta`

Error:
- `success: false`
- `error.code`
- `error.message`
- optional validation details

## Status Semantics
200 success/read
201 created
204 successful deletion/update with no body
400 invalid request
401 unauthenticated
403 authenticated but not authorized
404 resource not found
409 conflict
422 validation failure
429 rate limited
500 unexpected server error

## Slugs
Public project pages use stable, URL-safe unique slugs.

## Versioning
Initial API may use `/api/...`. Breaking changes require a documented version strategy.

## Antigravity Rule
Do not invent endpoints during implementation. If a new endpoint becomes necessary, update this document first.
