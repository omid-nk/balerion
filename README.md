# Balerion

Balerion is a modern online learning platform for discovering, purchasing, and managing programming courses.

The project is built with Next.js and uses Supabase as its backend infrastructure, including authentication, PostgreSQL database, and storage. The platform includes a public course catalog, course details, user accounts, shopping cart functionality, comments, favorites, and an administrative interface for managing courses and content.

> **Status:** In Development  
> Balerion is currently under active development and is not yet a complete production-ready platform. Some features and parts of the platform are still being implemented.

---

## Overview

Balerion is designed as a full-stack learning platform with a focus on a clean user experience and a structured content management system.

The platform provides two main areas:

- **Public platform** — course discovery, course details, authentication, shopping cart, and user interactions.
- **Management area** — course creation and management, comment moderation, profile settings, and other administrative functionality.

The application follows a modular structure so that pages, UI components, business logic, and backend-related services remain separated.

---

## Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- Tiptap
- Framer Motion
- React Icons
- React Hot Toast

### Backend

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Row Level Security (RLS)

### Development

- ESLint
- Git
- npm

---

## Backend

Balerion does not use a separate traditional backend server. The backend infrastructure is provided by **Supabase**.

Supabase is responsible for:

- User authentication
- PostgreSQL database
- Database relationships and constraints
- Row Level Security policies
- Server-side data access
- File storage
- Database functions and triggers

The application communicates with Supabase through dedicated client and server utilities located in:

```text
src/lib/supabase/
├── client.js
├── server.js
└── proxy.js
```

This separation allows Supabase access to be handled according to the execution environment of each part of the Next.js application.

---

## Database

The database is built on PostgreSQL through Supabase.

The current database structure includes the following main entities:

## Profiles

Stores user profile information associated with Supabase Auth users.

```text
profiles
├── id
├── username
├── full_name
├── avatar_url
├── bio
├── phone
├── created_at
└── updated_at
```

The profile ID is linked directly to **auth.users**.

## Admin Users

Administrative access is handled separately from the normal user profile.

```text
admin_users
├── user_id
├── created_at
└── created_by
```

This allows administrative permissions to be managed independently from regular profile information.

## Courses

Stores course information and course content.

```text
courses
├── id
├── name
├── slug
├── price
├── discount_price
├── cover_url
├── short_description
├── student_count
├── completion_percent
├── duration
├── content
├── prerequisites
├── status
├── created_at
└── updated_at
```

Course content and prerequisites are stored using PostgreSQL **jsonb** fields.

## Categories

Course and article categories are stored separately and connected through many-to-many relationship tables.

```text
categories
├── id
├── name
├── slug
├── icon
└── content
```

Relationship tables:

```text
course_categories
article_categories
```

## Articles

The database also contains the foundation for an article/content publishing system.

```text
articles
├── id
├── title
├── slug
├── excerpt
├── content
├── cover_url
├── author_id
├── status
├── created_at
└── updated_at
```

## Comments

The platform includes a comment system with moderation support. Comments can be associated with courses or articles, and replies are validated against their parent content.

---

## Security

Database security is handled through Supabase Row Level Security.

RLS is enabled for public tables, with database-level functions used for permission checks and administrative operations.

Administrative actions are restricted to users registered in admin_users.

For example, creating or removing an administrator requires an existing administrator, while an administrator cannot remove their own account from the admin list.

Database triggers are also used for tasks such as:

. Updating **updated_at** timestamps
. Creating a profile after user registration
. Validating comment relationships
. Automatically enabling RLS on newly created public tables

---
