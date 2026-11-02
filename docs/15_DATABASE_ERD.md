# NITINSINGHVERSE — DATABASE ERD & RELATIONSHIPS
Version: 1.0
Status: IMPLEMENTATION-READY

## Core Relationship Map

profiles
  └── about/settings content

skill_categories
  └── skills

projects
  ├── project_images
  └── project_skills ── skills

certifications
badges
education
experience
achievements
learning_journey
github_repositories

resume_versions
site_settings

media
  └── referenced by projects/certificates/badges/profile/resume/etc.

contact_messages

visitor_sessions
  └── visitor_events

notifications

## Cardinality
- skill_category 1 → many skills
- project 1 → many project_images
- project many ↔ many skills through project_skills
- visitor_session 1 → many visitor_events
- media can be referenced by multiple content records where reuse is supported

## Required Identity
Every content entity should have:
- id
- created_at
- updated_at
- visibility/status where applicable
- display/order field where ordering is user-controlled

## Publishing
Content intended for the public site must have an explicit published/visible state.
Draft content must never appear publicly.

## Integrity
- Foreign keys must enforce valid relationships.
- Unique constraints should protect slugs and other unique identifiers.
- Deletion behavior must be chosen intentionally; prefer archive/soft-delete for important portfolio records.

## Indexing
Index:
- public visibility/status
- project slug
- display order
- timestamps where used for sorting
- foreign keys used in frequent joins
- visitor session/event timestamps
- notification read state

## Security Boundary
RLS must ensure public users can only read published public content.
Admin operations require authenticated authorization.
Visitor/contact/admin data is not public.
