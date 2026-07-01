# 07_Team_Dashboard.md

# IKIGAI 2026

Team Dashboard

Version 1.0

---

# 1. Purpose

The Team Dashboard is the central workspace for every registered team.

After login, participants should immediately know

• Current Status

• Assigned Track

• Pending Tasks

• Submission Status

• Current Scores

• Announcements

without navigating through multiple pages.

Dashboard should prioritize information over decoration.

---

# 2. Dashboard Layout

-------------------------------------------------------

Navbar

-------------------------------------------------------

Welcome Card

↓

Statistics Cards

↓

Current Session

↓

Mentor Tasks

↓

Submission Status

↓

Score Card

↓

Announcements

↓

Activity Timeline

↓

Footer

-------------------------------------------------------

---

# 3. Sidebar

Contains

Dashboard

Submission

Tasks

Scores

Announcements

Profile

Logout

Future

Digital Ticket

Certificates

---

# 4. Welcome Card

Displays

Team Name

Leader Name

Track

Current Session

Mentor Group

Hackathon Status

Example

Welcome Team Alpha

Track

Cybersecurity

Session

Prototype Evaluation

Status

Active

---

# 5. Statistics Cards

Cards

Current Score

Completed Tasks

Pending Tasks

Submission Status

Example

Current Score

42/50

Pending Tasks

2

Submission

Completed

Current Rank

3

---

# 6. Dashboard Status

Possible Status

Registered

Waiting

Under Review

Task Assigned

Submission Accepted

Presentation Round

Completed

Winner

---

# 7. Current Session Card

Displays

Session Name

Date

Time

Mentors

Venue

Status

Countdown

Example

Prototype Evaluation

Starts in

02h 16m

---

# 8. Submission Module

One active submission only.

Fields

GitHub Repository

PPT Upload

Video Upload

ZIP Upload

Description

Version

Status

Buttons

Save Draft

Submit

Edit (Until Deadline)

After deadline

Locked

---

# 9. Submission Validation

GitHub

Valid URL

ZIP

Maximum 500MB

Video

Maximum 2GB

PPT

Maximum 50MB

Invalid uploads rejected.

---

# 10. Submission Status

Possible Values

Not Started

Draft

Submitted

Accepted

Rejected

Locked

---

# 11. Mentor Tasks

Displays

Task Title

Description

Priority

Deadline

Assigned By

Status

Buttons

Mark Complete

Upload Response

---

# 12. Task Status

Pending

Completed

Rejected

Overdue

Approved

---

# 13. Score Module

Displays

Current Session Score

Session Average

Overall Score

Track Rank

Overall Rank

No manual refresh.

Updates in realtime.

---

# 14. Score Details

Creativity

Originality

Presentation

Feasibility

Functionality

Remarks

Total

Average

---

# 15. Remarks

Mentor comments visible after session closes.

Example

Improve authentication flow.

Dashboard design needs consistency.

Good project structure.

---

# 16. Announcements

Latest announcements

Priority

Time

Unread Indicator

Realtime updates

No refresh required.

---

# 17. Notifications

Bell icon

Unread Count

Toast Messages

Examples

Task Assigned

New Announcement

Score Updated

Submission Accepted

---

# 18. Activity Timeline

Chronological order

Registration

↓

Submission

↓

Task Assigned

↓

Task Completed

↓

Evaluation

↓

Score Published

↓

Results

---

# 19. Team Members

Displays

Leader

Members

Email

Phone

Role

Read only.

---

# 20. Profile

Team Name

Track

College

Leader

Members

Edit allowed before registration closes.

After deadline

Locked.

---

# 21. Files

Uploaded files list

Version

Upload Time

Status

Download Button

---

# 22. Real-Time Updates

Realtime Enabled

Scores

Tasks

Announcements

Notifications

Session Status

Leaderboard Position

---

# 23. Dashboard Workflow

Login

↓

Dashboard

↓

View Tasks

↓

Upload Submission

↓

Mentor Reviews

↓

Score Published

↓

Leaderboard Updated

↓

Results

---

# 24. Empty States

No Tasks

"No tasks assigned."

No Score

"Evaluation pending."

No Submission

"Submit your project before the deadline."

---

# 25. Error Handling

Upload Failed

Retry Upload

Connection Lost

Reconnect

Invalid File

Display validation message

---

# 26. Security

Team accesses only

Own Dashboard

Own Tasks

Own Scores

Own Submission

No access to other teams.

---

# 27. Mobile Layout

Cards stacked vertically

Bottom Navigation

Floating Action Button

Sidebar replaced by Drawer

---

# 28. Desktop Layout

Sidebar Fixed

Content Grid

Multi-column Cards

Persistent Notifications

---

# 29. Performance

Lazy Loading

Realtime Updates

Optimized Images

Skeleton Loaders

No unnecessary API calls.

---

# 30. Future Features

Digital Ticket

QR Pass

Certificates

Attendance

Meal Credits

Mentor Chat

AI Feedback

---

# 31. Components

DashboardHeader

StatCard

SubmissionCard

TaskCard

ScoreCard

AnnouncementCard

TimelineCard

NotificationBell

ProfileCard

FileUpload

---

# 32. Success Criteria

✓ Dashboard loads in under 2 seconds

✓ Scores update instantly

✓ Tasks appear instantly

✓ Submission upload reliable

✓ Responsive on all devices

✓ No page reloads for updates

✓ Clear status indicators

---

End of Document