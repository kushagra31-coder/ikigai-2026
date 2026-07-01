# 18_Event_State_Machine_&_Business_Rules.md

# IKIGAI 2026

Event State Machine & Business Rules

Version

1.0

Purpose

Control entire hackathon lifecycle.

Every module in the application depends on the current event state.

There must always be exactly ONE active state.

---

# 1. Why State Machine?

Instead of checking

if registration_open

if submission_open

if result_open

if leaderboard_open

...

The application checks

Current Event State

↓

Decides what is allowed.

Single Source of Truth.

---

# 2. Event Lifecycle

Planning

↓

Registration Open

↓

Registration Closed

↓

Team Verification

↓

Opening Ceremony

↓

Hackathon Live

↓

Session 1

↓

Session 2

↓

Session 3

↓

Session 4

↓

Final Evaluation

↓

Leaderboard Published

↓

Winner Finalization

↓

Result Published

↓

Certificate Generation (Future)

↓

Hackathon Completed

---

# 3. State

Planning

Description

Website available.

No registration.

Allowed

Website

Sponsors

Timeline

Rules

FAQ

Admin Setup

Blocked

Registration

Submission

Scores

Leaderboard

Results

---

# 4. State

Registration Open

Allowed

Register Team

Login

View Website

Edit Registration

Admin Manage Teams

Blocked

Submission

Scores

Results

---

# 5. State

Registration Closed

Allowed

Login

Website

Track Information

Blocked

New Registration

Edit Registration

---

# 6. State

Team Verification

Admin verifies

Duplicate Teams

Eligibility

Member Count

Track Selection

After verification

↓

Approved

↓

Dashboard Activated

---

# 7. State

Opening Ceremony

Website

Live

Countdown removed.

Opening Banner shown.

Announcements enabled.

Submission

Locked.

---

# 8. State

Hackathon Live

Participants

Access Dashboard

Mentors

View Teams

Admin

Monitor Event

Submission

Opens if enabled.

---

# 9. State

Submission Open

Allowed

Upload

Edit Submission

Save Draft

Submit

Blocked

Evaluation

Scores

---

# 10. State

Submission Closed

Submission

Locked

Mentors

Can review

Participants

Read Only

---

# 11. State

Session 1

Idea Evaluation

Mentors

Evaluate

Assign Tasks

Teams

View Tasks

Scores

Visible after mentor submits.

Leaderboard

Realtime.

---

# 12. State

Session 2

Prototype Evaluation

Same Workflow

Session 1

Previous Scores

Locked.

---

# 13. State

Session 3

Presentation

Same

Session Structure

---

# 14. State

Session 4

Final Demonstration

Final technical evaluation.

---

# 15. State

Final Evaluation

No more edits.

Average Scores

Calculated.

Overall Rankings

Generated.

---

# 16. State

Leaderboard Published

Public

View Leaderboard

Search

Filter

Export

Mentors

Read Only

Admin

Publish

Freeze

---

# 17. State

Winner Finalization

Admin

Reviews

Top Rankings

Tie Break

Manual Approval

Winner Locked

---

# 18. State

Results Published

Homepage

Winner

Runner Up

Track Winners

Dashboard

Results Visible

Leaderboard Frozen

---

# 19. State

Certificates

Future

Generate

Participation

Winner

Mentor

Volunteer

---

# 20. State

Completed

Entire Event

Archived

Read Only

Future

Analytics

Gallery

Reports

---

# 21. Business Rules

Rule 1

One Team

One Submission

---

Rule 2

One Team

One Track

---

Rule 3

Mentor

Can evaluate

Assigned Teams Only

---

Rule 4

Evaluation

Cannot change

After Session Lock

---

Rule 5

Leaderboard

Generated Automatically

---

Rule 6

Results

Cannot Publish

Before Final Evaluation

---

Rule 7

Team

Cannot upload

After Submission Deadline

---

Rule 8

Admin

Cannot manually modify

Calculated Scores

Only reopen evaluation.

---

Rule 9

Every important action

Stored

Activity Log

---

Rule 10

Every realtime event

Must sync

All dashboards.

---

# 22. Permission Matrix

Planning

Admin

Only

Registration

Admin

Teams

Hackathon Live

All Roles

Evaluation

Mentors

Admin

Results

Everyone

Completed

Read Only

---

# 23. Event Controller

Website Starts

↓

Read Current State

↓

Determine Allowed Modules

↓

Render UI

↓

Block Invalid Actions

↓

Show Messages

No hardcoded checks.

---

# 24. State Changes

Only Admin

Can Change

Planning

↓

Registration

↓

Verification

↓

Hackathon

↓

Evaluation

↓

Results

↓

Completed

No automatic transitions.

---

# 25. Emergency State

Paused

Website

Available

Submission

Paused

Leaderboard

Frozen

Mentors

Locked

Admin

Can Resume

---

# 26. Maintenance State

Only Admin Login

Public

Maintenance Page

Database

Online

---

# 27. Audit

Every state change

Stores

Old State

New State

Admin

Timestamp

Reason

Immutable.

---

# 28. Success Criteria

✓ One active state

✓ No invalid actions

✓ Predictable workflow

✓ Easy maintenance

✓ Simple frontend logic

✓ Consistent behavior

---

End of Document