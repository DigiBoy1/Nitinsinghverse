# 06 --- Database Schema

This is the logical schema. Exact SQL/types/constraints must be
finalized before implementation.

## Core entities

-   profiles
-   about
-   skills
-   skill_categories
-   projects
-   project_images
-   project_skills
-   certificates
-   badges
-   education
-   experience
-   achievements
-   learning_journey
-   genai_projects
-   threejs_experiments
-   github_repositories
-   resume_versions
-   messages
-   notifications
-   visitors
-   visitor_sessions
-   site_settings
-   media

## Example: projects

Fields: - id - title - slug - short_description - full_description -
thumbnail - logo - problem - solution - features - tech_stack -
github_url - live_url - status - start_date - end_date - featured -
visibility - display_order - created_at - updated_at

## Example: skills

-   id
-   name
-   category_id
-   icon
-   description
-   url
-   proficiency_level
-   learning_status
-   featured
-   visibility
-   display_order
-   created_at
-   updated_at

## Example: certificates

-   id
-   title
-   issuer
-   issue_date
-   credential_id
-   image/media reference
-   pdf/media reference
-   description
-   verification_url
-   featured
-   visibility
-   display_order
-   created_at
-   updated_at

## Relationships

-   project_skills joins projects and skills.
-   project_images belongs to projects.
-   media can be referenced by multiple content records where
    appropriate.

## Analytics

Visitor records should use anonymous/session identifiers rather than
unnecessary personal identity.

## Data integrity

-   Slugs should be unique.
-   Required fields should be validated.
-   Delete behavior should be defined for related records.
-   Visibility and ordering should be consistent across content types.
