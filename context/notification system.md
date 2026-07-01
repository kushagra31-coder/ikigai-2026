# 11_Notification_System.md

# IKIGAI 2026

Notification & Announcement System

Version 1.0

Platform

Web Browser

Realtime

Supabase Realtime

Future

Push Notifications

Email

WhatsApp

---

# 1. Purpose

The Notification System is responsible for delivering important information to Teams, Mentors, and Admins in real time.

The goal is to eliminate dependency on WhatsApp groups for operational updates.

Every important event should be delivered through the platform.

---

# 2. Objectives

• Instant Communication

• Reliable Delivery

• Realtime Updates

• Browser Notifications

• In-App Notifications

• Role-Based Delivery

• Future Multi-Channel Support

---

# 3. Notification Types

Announcement

Task Assigned

Task Updated

Submission Accepted

Submission Rejected

Score Published

Leaderboard Updated

Session Started

Session Ending

Registration Approved

Registration Rejected

System Notification

---

# 4. User Types

Visitor

Receives

Public Announcements

---

Team

Receives

Announcements

Tasks

Scores

Submission Status

Leaderboard Updates

---

Mentor

Receives

Assigned Teams

Task Responses

Submission Updates

Session Alerts

Announcements

---

Admin

Receives

System Alerts

Registration Events

Submission Events

Error Reports

Mentor Activity

---

# 5. Delivery Channels

Version 1

✓ In-App Notification

✓ Browser Notification

Future

Email

WhatsApp

SMS

Mobile Push

Discord

Slack

---

# 6. Notification Workflow

Admin

↓

Create Announcement

↓

Database

↓

Supabase Realtime

↓

Notification Service

↓

Users

↓

Browser

↓

Notification Center

---

# 7. Announcement Workflow

Admin

↓

Write Announcement

↓

Select Audience

↓

Publish

↓

Realtime Broadcast

↓

Website Updates

↓

Notification Appears

---

# 8. Audience Selection

Everyone

Teams Only

Mentors Only

Admins Only

Track Specific

Session Specific

Future

Individual User

---

# 9. Notification Object

Each notification contains

Notification ID

Title

Description

Type

Priority

Receiver

Sender

Timestamp

Read Status

Action URL

Expiry Date (Optional)

---

# 10. Priorities

Low

Medium

High

Critical

Critical notifications always appear at the top.

---

# 11. Notification Center

Bell Icon

Unread Count

Scrollable List

Search

Filter

Mark All Read

Delete Notification

Infinite Scroll

Realtime

---

# 12. Browser Notifications

Permission requested only after login.

Never ask on first website load.

Workflow

Login

↓

User uses website

↓

System asks

"Allow notifications?"

↓

Permission Granted

↓

Browser Notifications Enabled

---

# 13. Notification States

Unread

Read

Archived

Expired

Deleted

---

# 14. Realtime Events

New Announcement

↓

Realtime Broadcast

↓

Toast

↓

Bell Count

↓

Browser Notification

↓

Notification Center Updated

---

# 15. Notification Card

Displays

Icon

Title

Description

Time

Priority Badge

Action Button

Read Indicator

---

# 16. Notification Icons

Announcement

📢

Task

📋

Submission

📤

Score

🏆

Leaderboard

📊

Session

⏳

System

⚙️

---

# 17. Toast Notifications

Top Right

Glass Card

Slide Animation

Auto Close

5 Seconds

Pause on Hover

Clickable

---

# 18. Browser Push

Examples

Your score has been updated.

Session 2 starts in 10 minutes.

Task assigned by Mentor.

Leaderboard updated.

Registration approved.

---

# 19. Notification Preferences

Users can enable

Announcements

Tasks

Scores

Leaderboard

Sessions

System

Email (Future)

Push

Browser

---

# 20. Read Workflow

Notification

↓

User Opens

↓

Marked Read

↓

Unread Count Updates

↓

Database Updated

---

# 21. Expiry

Announcements

Never

Session Alerts

Expire after Session Ends

Submission Alerts

Permanent

System Alerts

Configurable

---

# 22. Search

Search

Title

Description

Date

Priority

Instant

---

# 23. Filters

Unread

Read

Announcements

Tasks

Scores

Sessions

Today

This Week

Older

---

# 24. Performance

Realtime Delay

<1 Second

Notification Load

<300ms

Unread Count

Realtime

No polling

---

# 25. Offline Behavior

If user offline

↓

Store Notification

↓

Reconnect

↓

Deliver Pending Notifications

---

# 26. Database

notifications

Columns

id

receiver_id

title

description

type

priority

action_url

is_read

created_at

expires_at

---

# 27. Security

Users only access

Own Notifications

Admins

Access All

Mentors

Assigned Notifications Only

Teams

Own Notifications Only

---

# 28. UI Components

NotificationBell

NotificationBadge

NotificationCenter

NotificationCard

Toast

BrowserPermissionModal

SettingsPanel

---

# 29. Future Features

Scheduled Announcements

Email Notifications

WhatsApp Integration

AI Priority Detection

Smart Reminder System

Volunteer Alerts

Emergency Broadcast

---

# 30. Success Criteria

✓ Realtime Delivery

✓ Browser Notifications

✓ No Duplicate Notifications

✓ Secure Delivery

✓ Fast Performance

✓ Mobile Friendly

✓ User Controlled Preferences

---

End of Document