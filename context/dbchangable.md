# 04_Database_Design.md

# IKIGAI 2026

Database Design

Version 1.0

Database

Supabase PostgreSQL

---

# 1. Database Philosophy

The database must be

• Normalized

• Scalable

• Secure

• Easy to Query

• Production Ready

No duplicate data.

Every table should have one responsibility.

---

# 2. Database Overview

Database

│

├── users

├── teams

├── team_members

├── mentors

├── tracks

├── judging_sessions

├── evaluations

├── submissions

├── tasks

├── announcements

├── sponsors

├── leaderboard_cache

├── notifications

├── activity_logs

├── settings

└── files

---

# 3. users

Purpose

Authentication

Stores every account.

Columns

id (UUID)

email

password (Handled by Supabase)

role

created_at

last_login

status

Roles

ADMIN

MENTOR

TEAM

---

# 4. teams

Purpose

Stores one row per team.

Columns

id

team_name

leader_name

college

track_id

mentor_group

team_size

status

created_at

---

Example

Team Alpha

Track

Cybersecurity

Leader

Rahul

Members

4

---

# 5. team_members

Purpose

Store each participant.

Columns

id

team_id

name

email

phone

is_leader

created_at

One Team

↓

Many Members

---

# 6. mentors

Purpose

Mentor information.

Columns

id

user_id

name

email

department

designation

session

created_at

---

# 7. tracks

Purpose

Hackathon categories.

Columns

id

title

description

status

display_order

Example

AI

Cybersecurity

Agriculture

Healthcare

Smart Cities

---

# 8. judging_sessions

Purpose

Different evaluation rounds.

Columns

id

title

mentor_group

starts_at

ends_at

status

Example

Session 1

Idea Evaluation

Session 2

Prototype

Session 3

Presentation

---

# 9. evaluations

Purpose

Most important table.

Every mentor evaluation becomes one row.

Columns

id

team_id

mentor_id

session_id

creativity

originality

presentation

feasibility

functionality

remarks

total

created_at

Maximum

50

---

Why?

Never overwrite scores.

Always create a new evaluation.

History remains forever.

---

# 10. submissions

Purpose

Store project submission.

Columns

id

team_id

github_link

ppt_url

video_url

zip_url

submitted_at

status

One Team

↓

One Active Submission

---

# 11. tasks

Purpose

Mentor assigned work.

Columns

id

team_id

mentor_id

title

description

deadline

priority

status

created_at

Status

Pending

Completed

Rejected

---

# 12. announcements

Purpose

Website announcements.

Columns

id

title

content

priority

published_by

created_at

visible

---

# 13. sponsors

Purpose

Homepage sponsors.

Columns

id

name

logo

website

priority

---

# 14. leaderboard_cache

Purpose

Avoid recalculating leaderboard every request.

Columns

id

team_id

track_id

score

rank

updated_at

Updated automatically.

---

# 15. notifications

Purpose

Web notifications.

Columns

id

user_id

title

message

type

read

created_at

---

# 16. activity_logs

Purpose

Track every important action.

Columns

id

user_id

action

description

ip

created_at

Examples

Login

Submission

Score Updated

Task Assigned

Announcement Published

---

# 17. settings

Purpose

Global website settings.

Columns

id

event_name

registration_open

submission_open

leaderboard_visible

result_visible

maintenance_mode

---

# 18. files

Purpose

Store uploaded file metadata.

Columns

id

owner_id

type

url

size

created_at

---

# 19. Relationships

Users

↓

Mentors

Users

↓

Teams

Teams

↓

Members

Teams

↓

Submission

Teams

↓

Evaluations

Teams

↓

Tasks

Teams

↓

Leaderboard

Tracks

↓

Teams

Sessions

↓

Evaluations

Mentors

↓

Evaluations

---

# 20. Indexes

Create Index

email

team_name

mentor_id

track_id

session_id

created_at

These fields are queried frequently.

---

# 21. Constraints

Email

Unique

Team Name

Unique

Track

Required

Mentor

Required

Session

Required

---

# 22. Realtime Tables

Realtime Enabled

Evaluations

Announcements

Tasks

Leaderboard Cache

Notifications

No polling.

---

# 23. Security

Enable

Row Level Security

Every Table

Admin

Full Access

Mentor

Own Evaluations

Own Tasks

Team

Own Submission

Own Tasks

Visitor

Read Only

---

# 24. Backup Strategy

Daily Backup

Weekly Backup

Monthly Snapshot

---

# 25. Performance

No SELECT *

Always paginate

Limit

Offset

Indexes

Caching

Leaderboard Cache

---

# 26. Future Tables

Certificates

QR Tickets

Attendance

Meals

Analytics

Volunteer

Judges

AI Feedback

---

# 27. ER Diagram

Users

↓

Mentors

↓

Evaluations

↓

Teams

↓

Tracks

↓

Leaderboard

↓

Results

---

# 28. Naming Rules

snake_case

Primary Keys

UUID

created_at

updated_at

No spaces.

---

End of Document