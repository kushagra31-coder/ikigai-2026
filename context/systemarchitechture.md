# IKIGAI 2026
# System Architecture

Version 1.0

---

# 1. Architecture Overview

IKIGAI 2026 follows a modern Full Stack architecture using a client-server model.

The frontend is completely separated from backend services.

Supabase acts as the Backend-as-a-Service (BaaS).

This architecture minimizes backend maintenance while providing authentication, storage, database, realtime updates, and API services.

---

# 2. High Level Architecture

                           Internet
                                │
                                │
                   Vercel CDN (Next.js)
                                │
                                ▼
                    Next.js React Application
                                │
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
         ▼                      ▼                      ▼
 Authentication           Database API          File Upload
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                                ▼
                         Supabase Platform
                                │
     ┌───────────────┬───────────────┬───────────────┐
     ▼               ▼               ▼
 PostgreSQL     Authentication     Storage
     │               │               │
     └───────────────┼───────────────┘
                     ▼
              Realtime Engine

---

# 3. Software Layers

Presentation Layer

↓

Business Logic Layer

↓

API Layer

↓

Database Layer

↓

Storage Layer

---

# 4. Presentation Layer

Responsible for

UI

Animations

Navigation

Validation

User Interaction

Technology

Next.js

React

Tailwind

Framer Motion

GSAP

---

# 5. Business Layer

Responsible for

Authentication

Leaderboard Calculation

Task Assignment

Role Validation

Notifications

Submission Validation

Permission Checking

Business rules must NEVER exist inside UI components.

---

# 6. Database Layer

Supabase PostgreSQL

Stores

Users

Teams

Scores

Tasks

Announcements

Tracks

Submissions

Results

Mentors

Sponsors

---

# 7. Storage Layer

Supabase Storage

Stores

PPT

ZIP

Images

Videos

Sponsor Logos

Documents

Rules PDF

Problem Statement PDF

---

# 8. Realtime Layer

Supabase Realtime

Responsible for

Leaderboard Updates

Announcements

Task Updates

Score Updates

Notifications

Dashboard Refresh

No page refresh required.

---

# 9. User Flow

Visitor

↓

Website

↓

Register

↓

Login

↓

Dashboard

↓

Submission

↓

Mentor Review

↓

Score

↓

Leaderboard

↓

Result

---

# 10. Team Flow

Login

↓

Dashboard

↓

View Assigned Track

↓

Upload Submission

↓

Receive Mentor Task

↓

Complete Task

↓

Mentor Reviews

↓

Score Updates

↓

Final Result

---

# 11. Mentor Flow

Login

↓

Dashboard

↓

Assigned Teams

↓

Open Submission

↓

Evaluate

↓

Assign Task

↓

Save Scores

↓

Realtime Leaderboard Updates

---

# 12. Admin Flow

Login

↓

Dashboard

↓

Manage Teams

↓

Manage Mentors

↓

Manage Tracks

↓

Manage Sponsors

↓

Announcements

↓

Publish Results

↓

Export Data

---

# 13. Route Structure

/

Landing Page

/about

/tracks

/timeline

/rules

/faq

/contact

/login

/register

/dashboard

/leaderboard

/results

---

Private Routes

/team

/team/tasks

/team/submission

/team/profile

---

Mentor Routes

/mentor

/mentor/teams

/mentor/evaluation

/mentor/tasks

---

Admin Routes

/admin

/admin/dashboard

/admin/users

/admin/teams

/admin/tracks

/admin/sponsors

/admin/results

/admin/settings

---

# 14. Rendering Strategy

Landing Pages

Server Components

Dashboard

Client Components

Leaderboard

Hybrid

Problem Statements

Server Components

Forms

Client Components

---

# 15. State Management

Global State

Theme

Authentication

Notifications

User

Realtime Updates

Local State

Forms

Modal

Input

Dropdown

Search

---

# 16. Data Flow

User Action

↓

Validation

↓

API

↓

Supabase

↓

Database

↓

Realtime Trigger

↓

UI Refresh

---

# 17. Authentication Flow

User

↓

Login

↓

Supabase Auth

↓

JWT

↓

Middleware

↓

Protected Route

↓

Dashboard

---

# 18. Score Flow

Mentor

↓

Enter Score

↓

Validate

↓

Save

↓

Realtime Event

↓

Leaderboard Updates

↓

Teams Receive Updated Score

---

# 19. Announcement Flow

Admin

↓

Create Announcement

↓

Database

↓

Realtime Broadcast

↓

Website

↓

Notification Appears

---

# 20. Notification Flow

Event

↓

Realtime

↓

Notification Service

↓

Bell Icon

↓

Toast

↓

Push Notification

---

# 21. Error Handling

Client Error

↓

Toast

↓

Retry

↓

Fallback UI

↓

Log Error

Server Error

↓

Log

↓

Notify Admin

↓

Graceful Response

---

# 22. Security Layer

Protected Routes

Role Based Access

JWT Validation

Server Side Checks

Row Level Security

Rate Limiting

Secure File Upload

---

# 23. Performance Strategy

Lazy Loading

Image Optimization

Dynamic Imports

Code Splitting

Caching

Prefetching

Server Rendering

Edge CDN

---

# 24. Scalability

Current

300 Participants

Future

1000+

Architecture requires no redesign.

Only Supabase plan upgrade.

---

# 25. Logging

Authentication Logs

Submission Logs

Score Logs

Admin Activity

System Errors

Notification Logs

---

# 26. Folder Separation

Frontend

Independent

Backend

Managed by Supabase

Storage

Independent

Database

Independent

Authentication

Independent

---

# 27. Future Architecture

QR Ticket Service

Certificate Generator

AI Recommendation Engine

Native Mobile App

Analytics Dashboard

Volunteer Dashboard

API for College ERP

---

# 28. Principles

Single Source of Truth

Reusable Components

Reusable APIs

Minimal API Calls

No Duplicate Data

Strict Folder Structure

Strong Typing

Production Ready

---

End of Document