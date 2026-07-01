# 12_Digital_Ticket_System.md

# IKIGAI 2026

Digital Team Pass System

Version 1.0

Platform

QR Code

Future

NFC

---

# 1. Purpose

The Digital Team Pass System replaces paper coupons and manual attendance.

Every registered team receives one secure digital pass.

The pass is used throughout the hackathon for

• Entry

• Meal Collection

• Session Verification

• Checkpoints

• Exit

The same QR remains valid throughout the event.

---

# 2. Objectives

• Fast

• Secure

• No Manual Logging

• No Paper Coupons

• Low Cost

• Reusable

• Realtime

---

# 3. Philosophy

Participants should never waste time using the system.

The organizer should scan.

The participant only shows the Team Pass.

Entire interaction should finish within

2 seconds.

---

# 4. Team Pass

Each Team receives

Team ID

↓

Secure QR

↓

Digital Pass

Example

IKG-2026-041

This Team ID never changes.

---

# 5. QR Contents

QR DOES NOT contain

Team Name

Members

Phone

Email

Track

Scores

Passwords

Sensitive Information

QR ONLY stores

Signed Token

Example

UUID

↓

A73D-91KF-82MN-XP18

or

Signed JWT

Server validates the token.

---

# 6. Why Signed Tokens

If someone edits the QR

↓

Signature Invalid

↓

Rejected

If someone copies the QR

↓

Database prevents duplicate usage.

Security depends on backend validation.

Never on QR itself.

---

# 7. Registration Flow

Registration Approved

↓

Generate Team ID

↓

Generate Secure Token

↓

Create QR

↓

Store Token

↓

Attach QR to Team Profile

↓

Send QR

Email

Download

Dashboard

---

# 8. Team Pass

Contains

IKIGAI Logo

Team Name

Team ID

Track

QR

Emergency Contact

No sensitive data inside QR.

---

# 9. Volunteer Scanner

Volunteer opens

Scanner Page

↓

Camera Opens

↓

Scan QR

↓

Backend Verification

↓

Display Team

↓

Perform Action

Done.

---

# 10. Scan Workflow

Volunteer

↓

Scan QR

↓

Token Sent

↓

Supabase

↓

Token Verified

↓

Load Team

↓

Display

Team Name

Track

Members

Credits

↓

Volunteer Confirms

↓

Database Updated

↓

Success

---

# 11. Supported Actions

Entry

Lunch

Tea

Dinner

Mentor Checkpoint

Presentation Check-in

Exit

Future

Attendance

Certificate Collection

---

# 12. Meal Credits

Each Team

Lunch

Members Count

Dinner

Members Count

Tea

Members Count

Example

Members

5

Lunch Credits

5

Volunteer

Serve

3

↓

Remaining

2

System updates instantly.

---

# 13. Checkpoint Verification

Example

Prototype Review

↓

Scan

↓

Checkpoint Completed

↓

Timestamp Saved

No manual typing.

---

# 14. Timeline

Every scan creates

Activity

Timestamp

Operator

Location

Example

09:03

Entry

12:34

Lunch

15:00

Mentor Session

20:00

Dinner

Timeline available to Admin.

---

# 15. Duplicate Protection

Example

Lunch Credits

0

↓

Scan Again

↓

Rejected

Message

Lunch already collected.

---

# 16. Offline Mode

Future

Scanner stores scans locally.

↓

Internet returns

↓

Sync Database

---

# 17. Volunteer Dashboard

Shows

Scanner

Recent Scans

Today's Count

Errors

Queue

No login sharing.

Each volunteer has own account.

---

# 18. Scanner UI

Very Minimal

Camera

↓

Large Team Card

↓

Green

Success

↓

Red

Rejected

↓

Big Buttons

Serve

Cancel

Nothing else.

---

# 19. Database Tables

team_passes

id

team_id

token

status

created_at

---

scan_logs

id

team_id

action

station

operator

timestamp

---

meal_credits

team_id

meal_type

remaining

updated_at

---

# 20. Security

Signed Token

HTTPS

Supabase Auth

Volunteer Login Required

Activity Logs

Rate Limiting

No Client Validation

Everything verified by server.

---

# 21. QR Lifecycle

Generated

↓

Activated

↓

Used

↓

Event Ends

↓

Expired

↓

Archived

Old QR never reused.

---

# 22. Performance

Verification

<300ms

Scan

<2 sec

Realtime Update

<1 sec

No page reload.

---

# 23. Error Handling

Invalid QR

Expired QR

Already Used

Server Offline

Permission Denied

Friendly messages only.

---

# 24. Future NFC

Current

QR

Future

NFC Card

Same backend.

Only scanner changes.

Database unchanged.

---

# 25. Components

Scanner

CameraView

SuccessCard

ErrorCard

CreditsCard

HistoryCard

VolunteerPanel

QRGenerator

DownloadPassButton

---

# 26. Success Criteria

✓ Scan under 2 seconds

✓ Secure validation

✓ No duplicate usage

✓ No paper coupons

✓ Minimal volunteer interaction

✓ Scalable to 500+ participants

✓ Future NFC compatible

---

End of Document