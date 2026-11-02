# 05 --- Technical Architecture

## Initial deployment architecture

GitHub → Vercel → Public portfolio + suitable backend/API functions →
Supabase

Supabase provides: - PostgreSQL database - Authentication - Storage

## Architecture goals

-   Low initial cost
-   Simple deployment
-   Secure admin
-   Easy content updates
-   Scalable enough for a personal portfolio
-   Minimal operational complexity

## Application layers

### Presentation layer

Public portfolio UI, admin UI and responsive components.

### Application/API layer

Validation, business rules, authentication checks, CRUD operations,
analytics events and contact processing.

### Data layer

Supabase PostgreSQL and Storage.

## Data flow examples

### Project update

Admin → authenticated API/action → database → public project page.

### Certificate

Admin uploads media → Storage → certificate record → public viewer.

### Contact

Visitor submits form → validation → database → admin notification.

### Visitor

Visitor session → privacy-conscious event capture → stored analytics →
admin dashboard/notifications for meaningful events.

## Security principles

-   Never expose admin secrets in frontend code.
-   Protect admin routes.
-   Validate all public inputs.
-   Apply database access policies.
-   Restrict file operations.
-   Keep secrets in environment variables.
-   Avoid unnecessary personal data collection.
-   Add abuse/rate protection where appropriate.

## Performance principles

-   Lazy load non-critical content.
-   Optimize images.
-   Compress 3D assets.
-   Avoid loading heavy libraries globally.
-   Code split where useful.
-   Optimize fonts.
-   Use lightweight mobile scenes.
-   Measure performance before and after major changes.

## Important implementation rule

Do not finalize a framework/library choice merely because an AI suggests
it. Record the selected technology and rationale here before
implementation.
