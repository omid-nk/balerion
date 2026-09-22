# Balerion

Balerion is a modern Persian e-learning platform for discovering, purchasing, and managing programming courses. The project is designed as a full-stack web application with a focus on a clean user experience, scalable structure, and practical course management.

> **Status:** In active development. The project is not yet complete and new features and improvements are still being implemented.

## Overview

The platform provides:

* Course discovery and browsing
* Course detail pages and prerequisites
* Authentication and user profiles
* Shopping cart
* Course comments and moderation
* User settings and favorites
* Course creation and management for administrators
* Categories and content management
* Responsive and modern Persian UI

## Tech Stack

* **Next.js** — Application framework
* **React** — UI development
* **JavaScript** — Primary programming language
* **Tailwind CSS** — Styling
* **Supabase** — Backend, database, authentication and storage
* **Tiptap** — Rich text/content editing
* **React Icons** — Interface icons
* **Motion** — Animations

## Architecture

The project uses the Next.js App Router and follows a modular structure:

```text
src/
├── app/          # Routes and pages
├── components/   # Reusable UI components
├── data/         # Static/local data
├── fonts/        # Project fonts
├── lib/          # Shared libraries and Supabase clients
├── providers/    # Application providers
├── services/     # Data and business logic
└── styles/       # Global and component styles
```

Application routes are organized inside `src/app`, while reusable UI is separated into feature-based components such as courses, comments, cart, profile, and course details. Data access and application logic are handled through dedicated services and libraries.

## Backend

Balerion uses **Supabase** as its backend infrastructure.

Supabase is responsible for:

* PostgreSQL database
* User authentication
* User profiles and administration
* Course and category data
* Articles and comments
* Storage for uploaded assets
* Row Level Security and database functions

The database is structured around independent entities and relationships, with administrative access handled through a dedicated `admin_users` table rather than relying only on client-side roles.

## Development

The project is currently under active development. The existing architecture is intended to support additional course features, content management capabilities, and improvements to the overall platform as development continues.

---

Balerion is a personal development project focused on building a complete modern e-learning platform with Next.js and Supabase.
