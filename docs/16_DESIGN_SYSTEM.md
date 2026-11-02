# NITINSINGHVERSE — DESIGN SYSTEM
Version: 1.0
Status: IMPLEMENTATION-READY

## Design Direction
Dark, futuristic, premium, minimal and developer-focused.

The interface should feel:
- intelligent
- technical
- confident
- modern
- clean
- interactive without becoming noisy

## Brand
Primary visible identity:
- Nitin Singh
- nitinsinghverse / nitinverse

## Layout
- Mobile-first
- Responsive desktop/tablet/mobile
- No horizontal scrolling
- Consistent max-width content container
- Strong visual hierarchy
- Generous but controlled whitespace

## Color System
Use semantic design tokens rather than scattered hard-coded colors.
Recommended direction:
- deep dark background
- elevated dark surfaces
- high-contrast primary text
- muted secondary text
- one cool accent family
- optional secondary accent for 3D highlights
- semantic success/warning/error states

Exact values should be finalized during visual implementation and then tokenized.

## Typography
- Modern sans-serif
- Strong display hierarchy for hero
- Highly readable body text
- Avoid excessive font weights
- Responsive type scale

## Components
Standardize:
- Navbar
- Buttons
- Links
- Cards
- Project cards
- Skill cards
- Certificate cards
- Badge cards
- Tags/chips
- Inputs
- Textareas
- Modals
- Fullscreen certificate viewer
- Toasts
- Tables
- Admin sidebar
- Admin forms
- Empty/loading/error states

## Motion
Motion should communicate:
- entrance
- hierarchy
- interaction
- state changes

Avoid:
- constant distracting motion
- excessive parallax
- animation that blocks content
- animation on every element

Respect reduced-motion preferences.

## 3D
Three.js is selective.
- Hero may contain 3D.
- 3D Lab contains richer experiments.
- Other sections remain readable without 3D.
- Mobile receives reduced-complexity scenes/fallbacks.

## Accessibility
- keyboard focus
- sufficient contrast
- visible states
- labels
- alt text
- semantic structure
- reduced motion

## Design Consistency Rule
Antigravity must reuse established components/tokens instead of creating visually different versions of the same UI element.
