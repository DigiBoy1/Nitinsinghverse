# 02 --- Requirements

## Functional requirements

### FR-001 Admin authentication

Admin-only access to Portfolio Forge.

### FR-002 Profile management

Admin can update name, positioning, social links, profile media and
availability.

### FR-003 About management

Admin can edit About content and supporting sections.

### FR-004 Skills management

Admin can create, edit, hide, reorder and feature skills and categories.

Skill fields may include: - name - category - icon/logo - short
description - optional URL - proficiency level - learning status -
featured - visibility - display order

Avoid unsupported percentage-based proficiency.

### FR-005 Project management

Admin can create/edit/delete projects, publish/unpublish them, feature
them and reorder them.

Projects support: - title - slug - thumbnail - logo - short/full
description - problem - solution - features - tech stack - GitHub - live
demo - screenshots - video/demo - challenges - solutions - what was
learned - status - dates - featured - visibility - order

### FR-006 Case studies

Projects can have dedicated case-study pages.

### FR-007 AI/ML management

Admin can manage AI/ML projects, experiments and learning content
without presenting unfinished work as completed.

### FR-008 GenAI Lab

Admin can manage GenAI explorations/projects.

Potential categories: - LLM Applications - RAG - AI Agents - AI APIs -
Document AI - AI automation

### FR-009 Three.js Experiments

Admin can manage interactive 3D experiments with
demo/source/technology/description.

### FR-010 Certificates

Admin can manage certificate image/PDF, title, issuer, date, credential
ID, skills, description, verification URL, featured/visibility/order.

Public interaction: thumbnail → fullscreen viewer → details → optional
verification.

### FR-011 Badges

Separate visual subsection for badges. User currently has three Claude
badges; exact metadata must be entered from source credentials.

### FR-012 Education

Admin-managed education records.

### FR-013 Experience

Admin-managed experience records, future-ready even if currently empty.

### FR-014 Achievements

Admin-managed awards, hackathons, competitions, milestones and
open-source achievements.

### FR-015 Learning Journey

Admin-managed progression such as Web Development → Full-Stack → AI/ML →
Generative AI → AI-powered Products.

### FR-016 GitHub

Admin can manage profile link and selected repositories.

### FR-017 Resume/CV

Admin can upload/replace the active CV and optionally maintain versions.

### FR-018 Contact

Public contact form with admin statuses: Unread / Read / Archived.

### FR-019 Visitor analytics

Store historical anonymous visitor/session data for admin. Do not expose
a public realtime visitor counter.

Possible data: - timestamp - anonymous/session identifier - device -
browser - OS - approximate location - referrer/source - pages viewed -
session duration - meaningful interactions

Avoid collecting unnecessary personally identifying information.

### FR-020 Notifications

Admin notification center for meaningful events: - New visitor - Resume
viewed/downloaded - Project opened - GitHub clicked - New contact
message

Do not create a notification for every page view.

### FR-021 Media library

Reusable media assets for profile images, projects, screenshots,
certificates, badges, videos, OG images and 3D assets.

### FR-022 Site settings

Admin controls for title, description, SEO metadata, OG image, favicon,
theme settings, hero copy and availability.

### FR-023 Draft/Preview/Publish

Content workflow should support Draft → Preview → Publish where
practical.

### FR-024 Ordering and visibility

Admin can reorder and hide content without deleting it.

## Quality requirements

-   Mobile-first
-   Responsive
-   Accessible
-   Fast
-   SEO-friendly
-   Secure admin
-   No horizontal scroll
-   Reduced-motion support
-   Optimized images and 3D assets
-   Clear loading/error/empty states
