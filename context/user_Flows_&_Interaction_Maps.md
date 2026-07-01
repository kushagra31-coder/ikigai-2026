# 23_User_Flows_&_Interaction_Maps.md

# IKIGAI 2026

User Journey & Interaction Specification

Version

1.0

Purpose

Define every user interaction from entering the website until the hackathon ends.

Every feature should belong to a user journey.

No orphan pages.

---

# 1. User Types

Visitor

↓

Team

↓

Mentor

↓

Admin

Future

Volunteer

Judge

Media

Sponsor

---

================================================
VISITOR FLOW
================================================

Open Website

↓

Intro Animation

↓

Homepage

↓

Explore

↓

About

↓

Tracks

↓

Timeline

↓

Sponsors

↓

FAQ

↓

Register

↓

Verify Email

↓

Login

↓

Team Dashboard

---

================================================
TEAM FLOW
================================================

Login

↓

Dashboard

↓

Current Session

↓

View Announcement

↓

Complete Registration (if pending)

↓

Upload Submission

↓

Submission Accepted

↓

Mentor Reviews

↓

Task Assigned

↓

Notification Received

↓

Complete Task

↓

Mentor Reviews Again

↓

Score Published

↓

Leaderboard Updated

↓

Results Published

↓

Hackathon Complete

---

================================================
MENTOR FLOW
================================================

Login

↓

Dashboard

↓

Assigned Teams

↓

Choose Team

↓

Review Submission

↓

Evaluate

↓

Assign Task

↓

Save Draft

↓

Publish Evaluation

↓

Realtime Leaderboard Update

↓

Next Team

↓

Complete Session

↓

Logout

---

================================================
ADMIN FLOW
================================================

Login

↓

Command Center

↓

Monitor Event

↓

View Statistics

↓

Create Announcement

↓

Manage Teams

↓

Manage Mentors

↓

Manage Tracks

↓

Open Session

↓

Monitor Evaluations

↓

Publish Leaderboard

↓

Publish Results

↓

Archive Event

↓

Logout

---

================================================
LEADERBOARD FLOW
================================================

Mentor

↓

Submit Evaluation

↓

Database

↓

Average Scores

↓

Ranking

↓

Realtime Update

↓

Team Dashboard

↓

Public Website

---

================================================
NOTIFICATION FLOW
================================================

Event Happens

↓

Notification Created

↓

Realtime

↓

Toast

↓

Bell

↓

Browser Push

↓

Activity Feed

---

================================================
SUBMISSION FLOW
================================================

Dashboard

↓

Submission Page

↓

Upload Files

↓

Validation

↓

Save Draft

↓

Submit

↓

Locked

↓

Mentor Review

---

================================================
TASK FLOW
================================================

Mentor

↓

Assign Task

↓

Realtime

↓

Team Dashboard

↓

Complete Task

↓

Upload Response

↓

Mentor Review

↓

Approved

---

================================================
ANNOUNCEMENT FLOW
================================================

Admin

↓

Create

↓

Preview

↓

Publish

↓

Realtime Broadcast

↓

Website

↓

Dashboard

↓

Notifications

---

================================================
AUTHENTICATION FLOW
================================================

Login

↓

Supabase Auth

↓

JWT

↓

Role Detection

↓

Workspace

↓

Protected Routes

↓

Logout

---

================================================
DIGITAL PASS FLOW
================================================

Registration Approved

↓

Generate Team Pass

↓

QR Created

↓

Dashboard

↓

Download Pass

↓

Volunteer Scan

↓

Server Validation

↓

Checkpoint Complete

↓

Activity Log

---

================================================
ERROR FLOW
================================================

Action

↓

Validation

↓

Success

OR

↓

Friendly Error

↓

Retry

↓

Success

---

================================================
OFFLINE FLOW
================================================

Internet Lost

↓

Banner

↓

Disable Critical Actions

↓

Reconnect

↓

Sync Data

↓

Continue

---

================================================
LOADING FLOW
================================================

User Click

↓

Skeleton

↓

Data Fetch

↓

Animation

↓

Interactive

---

================================================
ROLE REDIRECTION
================================================

Login

↓

Role

↓

Team

→ /workspace

Mentor

→ /workspace

Admin

→ /workspace

Workspace changes dynamically.

---

================================================
REALTIME FLOW
================================================

Database Change

↓

Supabase Realtime

↓

Subscribed Clients

↓

UI Update

↓

Animation

↓

Complete

---

================================================
SUCCESS STATES
================================================

Registration Complete

Submission Uploaded

Evaluation Submitted

Task Completed

Announcement Published

Leaderboard Updated

Result Published

Every success has

Animation

Toast

Activity Log

---

================================================
FAILURE STATES
================================================

Network Failure

Authentication Failed

Permission Denied

Upload Failed

Realtime Lost

Database Error

Every failure has

Message

Retry

Support Link

---

================================================
END TO END JOURNEY

Visitor

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

Task

↓

Evaluation

↓

Leaderboard

↓

Result

↓

Hackathon Complete

---

Success Criteria

✓ Every page reachable

✓ No dead ends

✓ No unnecessary navigation

✓ Maximum 3 clicks to any primary action

✓ Consistent user experience

---

End of Document