# 09 --- Feature Specifications

## Visitor analytics

### Goal

Store useful historical visitor information for admin analysis without
implementing a public realtime counter.

### Visitor/session model

Use an anonymous visitor/session identifier.

Potential signals: - timestamp - device type - browser - OS -
approximate location - referrer/source - pages viewed - session
duration - meaningful interactions

### Admin views

-   Today
-   This Week
-   This Month
-   All Time
-   Popular pages
-   Traffic sources
-   Devices
-   Visitor journeys

Example journey: Google → Home → Projects → Mood Wala → Resume

### Notifications

Meaningful events only: - New visitor - Resume viewed - Resume
downloaded - Project opened - GitHub clicked - New contact message

Do not create a notification for every pageview.

## Contact messages

Statuses: - Unread - Read - Archived

Admin should see timestamp and message details.

## Certificate viewer

1.  Visitor sees thumbnail.
2.  Tap/click opens fullscreen viewer.
3.  High-quality media is shown.
4.  User can access View Details.
5.  Details reveal issuer, date, credential ID, skills, description and
    verification link when available.
6.  Desktop may support zoom.
7.  Mobile should support comfortable viewing and native pinch/zoom
    where technically appropriate.

## Search/filter

Projects: - All - Full-Stack - AI/ML - GenAI - 3D

Skills: - All - Frontend - Backend - AI/ML - GenAI - Tools

Certificates: - All - AI - Web - Cybersecurity - Other

Categories must remain admin-extensible.

## GitHub

Highlight only strong/representative repositories. Avoid displaying
empty or weak repositories simply to fill space.

## Future blog

Optional after launch: - How I Built Mood Wala - My Three.js Journey -
Building My First RAG Application - AI/ML Journey

Do not make the blog a launch blocker.
