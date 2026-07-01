# 08_Mentor_Dashboard.md

# IKIGAI 2026

Mentor Dashboard Specification

Version 1.0

Author
CSIT Development Team

---

# 1. Purpose

The Mentor Dashboard is the primary workspace for mentors during the hackathon.

Its objectives are

• Evaluate assigned teams

• Assign improvement tasks

• Review submissions

• Track judging sessions

• View announcements

• Monitor leaderboard updates

Mentors should never need to navigate through unnecessary pages.

Everything required for judging should be accessible within three clicks.

---

# 2. Dashboard Philosophy

Fast

Minimal

Professional

Information First

No decorative animations

Only micro interactions

Dark Theme

Optimized for continuous usage during judging sessions.

---

# 3. Layout Structure

-------------------------------------------------

Top Navigation

↓

Welcome Section

↓

Session Overview

↓

Assigned Teams

↓

Evaluation Queue

↓

Recent Activity

↓

Announcements

↓

Footer

-------------------------------------------------

---

# 4. Sidebar

Dashboard

Assigned Teams

Evaluation

Tasks

Leaderboard

Announcements

Profile

Settings

Logout

---

# 5. Welcome Card

Displays

Mentor Name

Department

Current Session

Assigned Track

Current Date

Current Time

Session Status

Example

Welcome

Dr. Rahul Sharma

Cybersecurity Mentor

Session

Prototype Evaluation

Status

Active

---

# 6. Session Overview

Displays

Session Name

Start Time

End Time

Remaining Time

Assigned Teams

Completed Evaluations

Pending Evaluations

Progress Bar

Example

Prototype Evaluation

10 Teams Assigned

7 Completed

3 Remaining

Progress

70%

---

# 7. Statistics Cards

Cards

Assigned Teams

Completed Reviews

Pending Reviews

Average Score Given

Current Session

Example

Assigned Teams

10

Completed

7

Pending

3

Average Score

41.8

---

# 8. Assigned Teams

Table Columns

Team Name

Track

Leader

Submission Status

Current Score

Task Status

Evaluation Status

Action

Action Button

Evaluate

---

# 9. Team Details

When mentor clicks

Evaluate

Open Team Details

Contains

Team Information

Members

Submission Files

Current Tasks

Previous Evaluations

Remarks

---

# 10. Submission Review

Mentor can access

GitHub Repository

Presentation

ZIP File

Demo Video

Description

Everything opens inside dashboard.

No download required unless necessary.

---

# 11. Evaluation Flow

Mentor

↓

Open Team

↓

Review Submission

↓

Evaluate

↓

Assign Task (Optional)

↓

Submit Score

↓

Realtime Update

↓

Next Team

---

# 12. Evaluation Form

Criteria

Creativity

Originality

Presentation

Feasibility

Functionality

Each

0–10

Only whole numbers

Maximum

10

Minimum

0

---

# 13. Remarks

Mentor Remarks

Maximum

500 Characters

Placeholder

Provide constructive feedback.

Example

Improve authentication.

Good UI consistency.

Presentation could be stronger.

---

# 14. Score Summary

Automatically Calculated

Creativity

8

Originality

9

Presentation

7

Feasibility

8

Functionality

10

----------------

Total

42/50

Average

8.4

Mentor cannot edit Total manually.

---

# 15. Validation Rules

Every field required.

Maximum

10

Minimum

0

No negative numbers.

No decimal values.

No submission if validation fails.

---

# 16. Save Workflow

Mentor Clicks Submit

↓

Validate Inputs

↓

Create Evaluation Record

↓

Calculate Total

↓

Store in Database

↓

Realtime Event Triggered

↓

Leaderboard Updated

↓

Team Dashboard Updated

↓

Success Message

---

# 17. Auto Save

Every 30 seconds

Save Draft

Draft visible only to mentor.

Final Submit locks evaluation.

---

# 18. Evaluation Status

Possible States

Pending

Draft

Submitted

Locked

Rejected by Admin

Reopened

---

# 19. Session Lock

When session deadline ends

Evaluation becomes

Read Only

Mentor cannot modify score.

Only Admin can unlock.

---

# 20. Activity Feed

Recent Actions

Reviewed Team Alpha

Assigned Task

Updated Score

Announcement Viewed

Newest activity first.

---

End of Part 1

# 08_Mentor_Dashboard.md

# Part 2

---

# 21. Task Assignment

Purpose

Mentors can assign improvement tasks after evaluating a team.

Tasks are visible instantly inside the Team Dashboard.

A task represents actionable feedback.

Example

Improve Authentication

Improve UI Consistency

Optimize Database

Fix Responsive Issues

Improve Documentation

---

# 22. Task Creation Form

Fields

Task Title

Description

Priority

Deadline

Session

Attachments (Optional)

Buttons

Save Draft

Assign Task

Cancel

---

# 23. Task Priorities

Low

Medium

High

Critical

Each priority has its own badge color.

Low

Gray

Medium

Blue

High

Orange

Critical

Red

---

# 24. Task Status

Pending

Accepted

In Progress

Submitted

Approved

Rejected

Overdue

Status updates automatically after every team action.

---

# 25. Task Workflow

Mentor

↓

Create Task

↓

Save

↓

Realtime Event

↓

Team Notification

↓

Task appears in Dashboard

↓

Team completes task

↓

Mentor reviews

↓

Approve

↓

Task Closed

---

# 26. Leaderboard

Mentors

CAN

View Leaderboards

View Rankings

View Scores

View Track Position

Mentors

CANNOT

Edit Leaderboard

Change Rank

Publish Winners

Delete Scores

The leaderboard updates automatically after evaluation.

---

# 27. Notifications

Mentor receives

Submission Uploaded

Task Completed

Announcement Published

Session Started

Session Ending

New Team Assigned

Every notification contains

Title

Message

Timestamp

Read Status

---

# 28. Notification Center

Dropdown

Unread Count

Search

Filter

Mark All Read

Delete Notification

Realtime

Enabled

---

# 29. Announcements

Mentor can read

Latest Announcements

Previous Announcements

Pinned Messages

Announcements are read only.

Only Admin can publish.

---

# 30. Search

Search Teams

Search Leader

Search College

Search Track

Search Submission

Search is instant.

---

# 31. Filters

Track

Submission Status

Evaluation Status

Task Status

Session

Sorting

Alphabetical

Highest Score

Lowest Score

Newest

Oldest

---

# 32. Profile

Mentor Information

Name

Email

Department

Assigned Track

Current Session

Phone

Profile Picture

Editable

Phone

Profile Picture

Password

Read Only

Department

Track

Email

---

# 33. Settings

Theme

Notifications

Language

Session Timeout

Default View

Future

Accessibility

---

# 34. Security

Mentors

Can access only

Assigned Teams

Assigned Sessions

Own Evaluations

Own Tasks

Mentors

Cannot

Delete Database Records

Modify Admin Data

Modify Other Mentor Data

View Hidden Results

---

# 35. Performance

Dashboard Load

<2 Seconds

Evaluation Save

<500ms

Realtime Update

Instant

File Preview

Lazy Loaded

Infinite Scrolling

Enabled

---

# 36. Error Handling

Submission Missing

Display Warning

Invalid Score

Reject Input

Network Failure

Retry

Realtime Lost

Reconnect

Server Error

Display Friendly Message

---

# 37. Activity Log

Every mentor action is logged.

Examples

Logged In

Opened Team Alpha

Viewed Submission

Assigned Task

Submitted Evaluation

Edited Draft

Published Evaluation

Logs cannot be edited.

Only Admin can access them.

---

# 38. Realtime Events

Score Submitted

↓

Leaderboard Updated

↓

Team Dashboard Updated

↓

Notification Sent

↓

Activity Logged

↓

Analytics Updated

---

# 39. Mobile Layout

Bottom Navigation

Cards

Collapsible Sidebar

Floating Submit Button

Swipe Between Teams

Optimized for Tablets

---

# 40. Desktop Layout

Left Sidebar

Fixed

Right Workspace

Resizable Panels

Evaluation always visible

No page refresh

---

# 41. Components

MentorSidebar

MentorHeader

StatisticsCard

TeamTable

EvaluationPanel

TaskPanel

NotificationCenter

ProfileCard

SearchBar

FilterDropdown

SessionCard

LeaderboardPreview

AnnouncementCard

---

# 42. Success Criteria

Mentor can

✓ Review all assigned teams

✓ Submit evaluation

✓ Assign tasks

✓ Receive realtime updates

✓ Navigate without page reload

✓ Complete judging quickly

✓ Never lose evaluation drafts

---

End of Document
