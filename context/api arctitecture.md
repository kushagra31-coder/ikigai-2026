# 13_API_Architecture.md

# IKIGAI 2026

API & Service Architecture

Version 1.0

Architecture

Client → Service Layer → Supabase → PostgreSQL

---

# 1. Objective

The API layer separates UI components from database operations.

React Components must NEVER directly manipulate database logic.

Every operation passes through the Service Layer.

Architecture

UI

↓

Hooks

↓

Services

↓

Supabase

↓

Database

---

# 2. Architecture

Frontend

↓

React Components

↓

Custom Hooks

↓

Services

↓

Supabase SDK

↓

PostgreSQL

↓

Realtime

---

# 3. Principles

Single Responsibility

Reusable Services

No Duplicate Logic

Type Safe

Async Only

Error Handled

Realtime Ready

---

# 4. Folder Structure

src/

services/

auth/

team/

mentor/

admin/

leaderboard/

notification/

submission/

track/

announcement/

sponsor/

storage/

utils/

hooks/

types/

---

# 5. Auth Service

Purpose

Authentication only.

Functions

login()

register()

logout()

resetPassword()

refreshSession()

getCurrentUser()

---

# 6. Team Service

Functions

createTeam()

updateTeam()

deleteTeam()

getTeam()

getMembers()

updateProfile()

---

# 7. Submission Service

Functions

uploadSubmission()

updateSubmission()

deleteSubmission()

getSubmission()

validateSubmission()

---

# 8. Evaluation Service

Functions

createEvaluation()

updateDraft()

publishEvaluation()

getEvaluations()

calculateAverage()

---

# 9. Leaderboard Service

Functions

fetchLeaderboard()

calculateRanking()

refreshLeaderboard()

publishLeaderboard()

---

# 10. Task Service

Functions

createTask()

updateTask()

approveTask()

rejectTask()

getTasks()

---

# 11. Announcement Service

Functions

createAnnouncement()

publishAnnouncement()

deleteAnnouncement()

updateAnnouncement()

---

# 12. Notification Service

Functions

sendNotification()

markAsRead()

getNotifications()

subscribeRealtime()

---

# 13. Storage Service

Functions

uploadImage()

uploadPPT()

uploadZIP()

uploadVideo()

deleteFile()

getPublicURL()

---

# 14. Sponsor Service

Functions

createSponsor()

updateSponsor()

deleteSponsor()

fetchSponsors()

---

# 15. Track Service

Functions

createTrack()

updateTrack()

deleteTrack()

getTracks()

---

# 16. Session Service

Functions

createSession()

closeSession()

publishSession()

assignMentors()

assignTeams()

---

# 17. Admin Service

Functions

dashboardStats()

exportCSV()

exportExcel()

manageUsers()

systemHealth()

---

# 18. Hooks

useAuth()

useLeaderboard()

useNotifications()

useSubmission()

useEvaluation()

useTasks()

useSponsors()

useTracks()

useRealtime()

---

# 19. API Pattern

UI

↓

Hook

↓

Service

↓

Supabase

↓

Database

↓

Return

Never

UI

↓

Database

---

# 20. Validation Layer

Client Validation

↓

Server Validation

↓

Database Constraint

All three required.

---

# 21. Error Handling

Every service returns

Success

Data

Message

Error

Never throw raw database errors to UI.

---

# 22. Loading States

Every request

Idle

Loading

Success

Error

Retry

---

# 23. Realtime

Services subscribe to

Scores

Announcements

Leaderboard

Tasks

Notifications

No polling.

---

# 24. API Security

Authentication Required

JWT Verified

Role Checked

RLS Enabled

HTTPS Only

---

# 25. Database Transactions

Used For

Submission

Evaluation

Task Assignment

Leaderboard Refresh

Multiple database updates execute as one transaction.

---

# 26. Logging

Every API call logs

Time

Duration

User

Result

Errors

---

# 27. Rate Limiting

Login

Submission

Evaluation

Announcements

Prevent spam.

---

# 28. File Upload Flow

User

↓

Validate

↓

Compress (if image)

↓

Supabase Storage

↓

Database Record

↓

Return URL

---

# 29. Response Format

Every service returns

success

message

data

error

timestamp

Standardized across project.

---

# 30. Performance

Caching

Lazy Queries

Pagination

Realtime

Optimized Uploads

Debounced Search

---

# 31. Future APIs

Certificate Service

QR Service

Analytics Service

Volunteer Service

AI Feedback Service

Email Service

WhatsApp Service

---

# 32. Coding Rules

No business logic inside components.

Services only communicate with Supabase.

Hooks only communicate with Services.

Components only communicate with Hooks.

---

# 33. Success Criteria

✓ Reusable

✓ Typed

✓ Secure

✓ Fast

✓ Scalable

✓ Testable

✓ Easy Maintenance

---

End of Document