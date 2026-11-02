# NITINSINGHVERSE — QA & TEST PLAN
Version: 1.0
Status: IMPLEMENTATION-READY

## Testing Layers

### Functional
- navigation
- project filtering
- project detail pages
- certificate viewer/details
- resume view/download
- contact submission
- admin CRUD
- publish/unpublish
- ordering
- media upload/reference
- notifications
- analytics events
- authentication/logout

### Responsive
Test:
- mobile phone
- tablet
- desktop
- portrait/landscape where relevant

Verify:
- no overflow
- no overlap
- touch targets
- readable typography
- usable menus/modals

### Browser
Primary:
- Chrome desktop
- Chrome Android
- Safari iPhone
- Edge
- Firefox

### Security
- unauthenticated admin access blocked
- unauthorized API access blocked
- RLS verified
- private data not exposed
- secrets absent from client bundle/repository
- input validation
- contact abuse/rate-limit protection

### SEO
- title
- description
- canonical
- sitemap
- robots
- Open Graph
- semantic headings
- project URLs
- indexability

### Performance
- initial load
- image loading
- 3D load
- mobile performance
- lazy loading
- unnecessary JavaScript
- animation cost

### Accessibility
- keyboard navigation
- focus states
- labels
- alt text
- contrast
- reduced motion

## Regression Rule
Every feature change must test the changed feature plus nearby dependent flows.

## Release Gate
No production release if:
- critical functionality is broken
- admin security fails
- mobile layout is broken
- private data is exposed
- major console/runtime errors remain
- important public pages are not indexable as intended

## Evidence
Antigravity should report:
- files changed
- tests performed
- desktop result
- mobile result
- known limitations
