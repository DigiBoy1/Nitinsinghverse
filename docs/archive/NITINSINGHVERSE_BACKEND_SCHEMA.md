# NITINSINGHVERSE — BACKEND & DATABASE SCHEMA

**Version:** 1.0  
**Status:** FINAL / PLANNING  
**Purpose:** Backend, API, database, authentication, storage, analytics and admin data architecture for nitinsinghverse.

## 1. Backend Architecture

The backend will use **Next.js Route Handlers** with **Supabase PostgreSQL, Supabase Auth and Supabase Storage**.

```text
Browser
  ↓
Next.js App / Route Handlers
  ├── Public APIs
  ├── Admin APIs
  ├── Contact APIs
  ├── Analytics APIs
  └── Health API
          ↓
      Supabase
      ├── PostgreSQL
      ├── Auth
      └── Storage
```

There will be **no separate always-running Express server** for the initial portfolio.

## 2. Database Principles

- PostgreSQL is the source of truth for structured portfolio data.
- Supabase Auth handles admin identity/session management.
- Supabase Row Level Security protects private data.
- Public content should be readable only when marked published/visible.
- Admin-only data must never be exposed through public APIs.
- Media files live in Supabase Storage; database stores their metadata and references.
- Soft-delete/archive is preferred for important records instead of destructive deletion.
- Every ordered content type should have a `display_order` field.
- Content should support draft/published visibility where useful.

## 3. Core Tables

```text
profiles
about_sections
site_settings
skills
skill_categories
projects
project_skills
project_images
certifications
badges
education
experience
achievements
learning_journey
github_repositories
resume_versions
media
contact_messages
visitor_sessions
visitor_events
notifications
```

## 4. Common Fields

Most content tables should use:

```text
id              UUID / primary key
created_at      timestamp
updated_at      timestamp
is_visible      boolean
is_featured     boolean (where applicable)
display_order   integer (where ordering applies)
```

Do not duplicate common fields where they do not logically apply.

## 5. profiles

Stores the primary identity/profile information.

Fields:

```text
id
name
brand_name
headline
short_intro
profile_image_url
location_text       optional
email
github_url
linkedin_url
resume_url
availability_status
availability_text
created_at
updated_at
```

Only one primary profile record is expected for the initial system.

## 6. about_sections

Allows the About page to be managed dynamically.

Fields:

```text
id
title
content
section_type
display_order
is_visible
created_at
updated_at
```

Possible section types:

```text
who_i_am
what_i_do
what_im_exploring
what_i_build
personal_note
```

## 7. site_settings

Global website configuration.

Fields:

```text
id
site_title
site_description
canonical_url
og_image_url
favicon_url
hero_title
hero_subtitle
hero_description
contact_email
footer_text
theme_config_json
seo_config_json
created_at
updated_at
```

Sensitive secrets must **not** be stored here.

## 8. skill_categories

Admin-created skill groups.

Fields:

```text
id
name
slug
description
icon_url
display_order
is_visible
created_at
updated_at
```

Categories are not hard-coded so the admin can add/edit them later.

## 9. skills

Fields:

```text
id
category_id
name
slug
icon_url
short_description
skill_url
proficiency_level
learning_status
is_featured
is_visible
display_order
created_at
updated_at
```

Recommended proficiency values:

```text
learning
familiar
intermediate
advanced
```

Avoid fake percentage scores such as `95% Python`.

## 10. projects

Main portfolio project table.

Fields:

```text
id
name
slug
logo_url
thumbnail_url
short_description
full_description
problem
solution
architecture
features_json
tech_stack_json
status
start_date
end_date
github_url
live_demo_url
video_url
challenges
how_i_solved
what_i_learned
is_featured
is_visible
display_order
created_at
updated_at
```

Recommended status values:

```text
planned
building
completed
archived
```

## 11. project_skills

Many-to-many relationship between projects and skills.

Fields:

```text
project_id
skill_id
```

Example:

```text
Mood Wala → Node.js
Mood Wala → WebSockets
Mood Wala → JavaScript
```

## 12. project_images

Fields:

```text
id
project_id
media_id
caption
alt_text
display_order
created_at
```

Supports multiple screenshots/images per project.

## 13. certifications

Fields:

```text
id
title
issuer
issue_date
credential_id
verification_url
certificate_media_id
description
skills_json
category
is_featured
is_visible
display_order
created_at
updated_at
```

Certificate viewer flow:

```text
Thumbnail → Fullscreen Viewer → Details → Verification
```

## 14. badges

Fields:

```text
id
name
issuer
earned_date
badge_media_id
verification_url
description
category
is_featured
is_visible
display_order
created_at
updated_at
```

## 15. education

Fields:

```text
id
institution
degree
field_of_study
start_date
end_date
status
institution_logo_media_id
description
coursework_json
achievements_json
is_visible
display_order
created_at
updated_at
```

## 16. experience

Fields:

```text
id
company
role
location
start_date
end_date
is_current
description
responsibilities_json
technologies_json
company_logo_media_id
is_visible
display_order
created_at
updated_at
```

The structure must work even when there is no experience data yet.

## 17. achievements

Fields:

```text
id
title
organization
date
category
description
achievement_media_id
verification_url
is_featured
is_visible
display_order
created_at
updated_at
```

Possible categories:

```text
hackathon
competition
award
open_source
milestone
other
```

## 18. learning_journey

Fields:

```text
id
title
stage
description
skills_json
start_date
end_date
status
display_order
is_visible
created_at
updated_at
```

Example progression:

```text
Web Development
      ↓
Full-Stack
      ↓
AI/ML
      ↓
Generative AI
      ↓
AI-powered Products
```

## 19. github_repositories

Fields:

```text
id
repo_name
repo_url
description
technologies_json
stars
forks
is_featured
is_visible
display_order
last_synced_at
created_at
updated_at
```

GitHub API integration is optional for a later phase.

## 20. resume_versions

Fields:

```text
id
version_name
media_id
is_current
uploaded_at
notes
created_at
```

Only one resume should normally be marked current.

## 21. media

Central media metadata table.

Fields:

```text
id
file_name
storage_path
public_url
mime_type
file_size
width
height
media_type
alt_text
folder
uploaded_by
created_at
updated_at
```

Possible media types:

```text
image
pdf
video
3d_asset
other
```

Media should be reusable across projects, certificates, badges, resume and profile sections.

## 22. contact_messages

Fields:

```text
id
name
email
subject
message
status
created_at
read_at
archived_at
```

Status values:

```text
unread
read
archived
```

Optional future field:

```text
email_notification_sent
```

## 23. visitor_sessions

Stores saved visitor/session information. There is **no realtime visitor counter**.

Fields:

```text
id
anonymous_session_id
started_at
last_seen_at
ended_at
device_type
browser
operating_system
referrer
landing_page
exit_page
page_count
session_duration_seconds
```

Privacy-first approach: do not claim to identify a person unless they voluntarily provide identifying information.

## 24. visitor_events

Stores meaningful visitor actions.

Fields:

```text
id
session_id
event_type
page_path
target_type
target_id
event_metadata_json
created_at
```

Recommended event types:

```text
portfolio_visit
project_opened
mood_wala_opened
resume_viewed
resume_downloaded
github_clicked
linkedin_clicked
contact_submitted
certificate_opened
```

Do not generate admin notifications for every pageview.

## 25. notifications

Admin notification center.

Fields:

```text
id
type
title
message
entity_type
entity_id
is_read
created_at
read_at
```

Examples:

```text
new_visitor
resume_interaction
project_interaction
new_contact_message
```

## 26. Authentication

Supabase Auth will manage admin authentication.

```text
Admin
  ↓
Supabase Auth
  ↓
Authenticated Session
  ↓
Protected Admin Routes
  ↓
Authorized Database Operations
```

Required:

- protected admin routes
- server-side authorization
- RLS policies
- logout/session handling
- no credentials in frontend code

## 27. API Structure

Conceptual API groups:

```text
/api/health

/api/profile
/api/about
/api/settings

/api/skills
/api/skill-categories

/api/projects
/api/projects/[slug]

/api/certifications
/api/badges
/api/education
/api/experience
/api/achievements
/api/learning-journey
/api/github
/api/resume

/api/media

/api/contact

/api/analytics/session
/api/analytics/event

/api/notifications
```

Actual endpoint naming can be adjusted during implementation without changing the database model.

## 28. Public vs Admin API Rules

### Public

Can expose only published portfolio information:

```text
profile
about
published projects
visible skills
visible certificates
visible badges
education
experience
achievements
learning journey
current resume
selected GitHub repositories
site settings needed by frontend
```

### Admin

Can access/manage:

```text
all CMS content
visitor analytics
notifications
contact messages
media
settings
```

Private visitor/contact data must never be returned by public endpoints.

## 29. Health API

`/api/health` is for:

- deployment verification
- basic application diagnostics
- optional database connectivity verification

It must return only safe health information.

**It must NOT be used as a keep-alive mechanism.**

No scheduled ping will be introduced merely to keep the application awake.

## 30. Security / RLS

Supabase Row Level Security is mandatory.

Rules:

- Public can read only approved public records.
- Anonymous visitors can create only the minimum analytics/contact records permitted.
- Admin can manage CMS data.
- Visitor analytics are admin-only for reading.
- Contact messages are admin-only for reading.
- Notifications are admin-only.
- Storage policies must prevent unauthorized private uploads/downloads.

## 31. Data Validation

Every public form/API input must be validated.

Validate:

- required fields
- email format
- string lengths
- URLs
- IDs
- enum/status values
- uploaded file type/size

Never trust client-side validation alone.

## 32. Delete Strategy

For important portfolio content:

```text
Visible → Hidden/Archived → Optional permanent deletion
```

Permanent deletion should be an intentional admin action.

When deleting media, first check whether it is referenced elsewhere.

## 33. Indexing / Performance

Indexes should be considered for:

```text
slug
is_visible
is_featured
display_order
created_at
project_id
skill_id
session_id
event_type
notification is_read
contact status
```

Do not add indexes blindly; verify actual query patterns during implementation.

## 34. Backend Workflow

```text
Admin changes content
        ↓
Authenticated Route Handler
        ↓
Validate input
        ↓
Authorize admin
        ↓
Supabase DB/Storage
        ↓
Success response
        ↓
Public site reads published data
```

## 35. Error Handling

API errors should:

- use appropriate HTTP status codes
- return safe user-facing messages
- avoid exposing database/service secrets
- log useful server-side diagnostic information
- never reveal stack traces to public users

## 36. Backend Acceptance Checklist

Before implementation is considered complete:

- [ ] Supabase project configured
- [ ] Database schema created
- [ ] RLS policies tested
- [ ] Admin authentication tested
- [ ] Admin CRUD tested
- [ ] Media upload tested
- [ ] Public/private access tested
- [ ] Contact submission tested
- [ ] Visitor analytics tested
- [ ] Notifications tested
- [ ] Health endpoint tested
- [ ] Error handling tested
- [ ] Mobile frontend API behavior tested
- [ ] Secrets stored only in environment variables
- [ ] No keep-alive ping implemented
- [ ] No sensitive analytics exposed publicly

## 37. Implementation Rule for Antigravity

Antigravity must treat this document as the backend data contract.

Before creating or changing backend code:

1. Inspect the existing project structure.
2. Compare implementation with the approved schema.
3. Do not invent new tables without documenting the reason.
4. Do not remove fields/tables without approval.
5. Keep public and admin permissions separate.
6. Test RLS and authorization, not only UI behavior.
7. Do not modify unrelated frontend features during backend work.
8. Report changed files and tests after each task.

## 38. Final Backend Stack

```text
Next.js App Router
        ↓
Next.js Route Handlers
        ↓
Supabase PostgreSQL
Supabase Auth
Supabase Storage
        ↓
Vercel
```

**No separate always-running Express server.**  
**No realtime visitor counter.**  
**No health-route keep-alive.**  
**No code implementation before the documentation is approved.**
