# IKIGAI 2026
## Official Hackathon Management Platform

Version: 1.0

Author: CSIT Development Team

Project Type:
Full Stack Web Application

Target Platform:
Web (Mobile First)

---

# 1. Project Overview

IKIGAI 2026 is the official web platform for managing the departmental hackathon organized by the CSIT Department.

The platform serves as a centralized ecosystem for participants, mentors, judges, coordinators, and administrators throughout the complete hackathon lifecycle.

Instead of using multiple disconnected services (Google Forms, Excel Sheets, WhatsApp announcements, manual scoring, etc.), IKIGAI 2026 integrates all major workflows into one modern platform.

The primary focus of the platform is simplicity, speed, scalability, and excellent user experience.

---

# 2. Vision

To create a premium, production-grade hackathon platform that provides a seamless experience for participants while reducing the operational workload for organizers, mentors, and administrators.

The platform should feel comparable to professional event platforms while remaining lightweight, responsive, and intuitive.

---

# 3. Objectives

Primary Objectives

• Digitalize the complete hackathon workflow

• Reduce manual management

• Real-time score updates

• Centralized mentor evaluation

• Modern user experience

• Responsive on every device

• Fast loading

• Secure authentication

• Easy administration

---

Secondary Objectives

• Easy scalability for future events

• Reusable architecture

• Real-time collaboration

• Automated leaderboard generation

• Dynamic announcements

• Future QR Ticket integration

• Future Certificate generation

---

# 4. Target Users

## Visitor

Can

- View Website
- View Problem Statements
- View Timeline
- Register
- Login
- View Leaderboard
- View Results

Cannot

- Edit anything

---

## Participant (Team)

Can

- Login

- View Dashboard

- Submit Project

- View Tasks

- View Scores

- View Announcements

- Update Profile

Cannot

- Modify leaderboard

- Access admin features

---

## Mentor

Can

- Login

- View Assigned Teams

- Evaluate Teams

- Assign Tasks

- Update Scores

Cannot

- Edit Website

- Edit Other Mentors' Scores

---

## Admin

Can

- Complete Website Management

- Manage Teams

- Manage Mentors

- Manage Tracks

- Manage Problem Statements

- Manage Announcements

- Manage Leaderboards

- Publish Results

- Export Data

---

# 5. Core Modules

The application is divided into independent modules.

01 Landing Website

02 Authentication

03 Team Dashboard

04 Mentor Dashboard

05 Admin Dashboard

06 Leaderboard System

07 Submission System

08 Announcement System

09 Notification System

10 Task Management

11 Result Management

12 Sponsor Management

13 Settings

---

# 6. Website Sections

Homepage

About

Tracks

Timeline

Rules

FAQs

Sponsors

Leaderboard

Results

Contact

Login

Register

---

# 7. Functional Requirements

The platform must

✓ Authenticate users

✓ Maintain user roles

✓ Store submissions

✓ Store mentor evaluations

✓ Generate leaderboards

✓ Send notifications

✓ Display announcements

✓ Maintain responsive UI

✓ Handle concurrent users

✓ Support future QR integration

---

# 8. Non Functional Requirements

Performance

First Load

< 2.5 seconds

Page Navigation

< 500 ms

Leaderboard Refresh

Realtime

Database Response

< 300 ms

Authentication

< 2 seconds

---

Security

HTTPS only

Encrypted Passwords

Role Based Authentication

Protected Routes

Input Validation

Secure File Upload

---

Scalability

Minimum

300 Participants

100 Teams

20 Mentors

5 Admins

Future Support

1000+ Participants

---

Availability

99.9%

---

Accessibility

Keyboard Navigation

Responsive Layout

Readable Typography

Dark Theme

High Contrast

---

# 9. Project Scope

Included

✔ Public Website

✔ Team Login

✔ Mentor Login

✔ Admin Login

✔ Leaderboards

✔ Real-time Updates

✔ File Submission

✔ Sponsor Section

✔ Announcements

✔ Tasks

✔ Scores

Not Included (Version 1)

✖ Certificates

✖ QR Attendance

✖ NFC

✖ AI Chatbot

✖ Payment Gateway

These features belong to Version 2.

---

# 10. Success Criteria

The project is considered successful when

• Participants can register and login successfully

• Teams can submit projects

• Mentors can evaluate teams

• Scores update automatically

• Leaderboards refresh in realtime

• Admin can manage all content

• Website works on mobile and desktop

• Average page load stays under 2.5 seconds

---

# 11. Technology Stack

Frontend

Next.js 15

React 19

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

GSAP

Lenis

Magic UI

Lucide React

React Hook Form

Zod

TanStack Query

Backend

Supabase

Authentication

Supabase Auth

Database

Supabase PostgreSQL

Realtime

Supabase Realtime

Storage

Supabase Storage

Deployment

Vercel

Version Control

Git

GitHub

---

# 12. UI Philosophy

Theme

Dark

Primary

Black

Accent

Purple

Secondary

Neon Cyan

Glassmorphism

Yes

Heavy Animations

Landing Page Only

Dashboard

Minimal

Professional

Premium

---

# 13. Future Roadmap

Version 1

Website

Leaderboards

Authentication

Mentor Dashboard

Admin Dashboard

Submission

Announcements

Version 2

QR Tickets

Attendance

Certificates

Analytics

Version 3

AI Assistant

Smart Recommendations

Event Analytics

Sponsor Dashboard

Native Mobile App

---

End of Document