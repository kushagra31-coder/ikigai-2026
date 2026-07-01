# 05_Authentication_&_Role_Based_Access.md

# IKIGAI 2026

Authentication & Authorization

Version 1.0

Authentication Provider

Supabase Auth

---

# 1. Authentication Philosophy

Authentication is responsible for identifying users.

Authorization is responsible for deciding what users can access.

Authentication must NEVER be trusted on the frontend alone.

Every protected action must also be verified on the server/database level using Supabase Row Level Security (RLS).

---

# 2. User Roles

The platform contains only three authenticated roles.

• Admin

• Mentor

• Team

Visitors do not authenticate.

---

# 3. Visitor Access

Visitors can access:

✓ Home

✓ About

✓ Tracks

✓ Timeline

✓ Sponsors

✓ Rules

✓ FAQ

✓ Contact

✓ Leaderboard

✓ Results

✓ Login

✓ Register

Visitors cannot access:

✗ Team Dashboard

✗ Mentor Dashboard

✗ Admin Dashboard

---

# 4. Team Access

Team users can access:

✓ Team Dashboard

✓ Team Profile

✓ Tasks

✓ Submission

✓ Scores

✓ Notifications

✓ Announcements

✓ Results

Team users cannot:

✗ Edit Scores

✗ Edit Other Teams

✗ Access Admin

✗ Access Mentor Dashboard

---

# 5. Mentor Access

Mentor users can access:

✓ Assigned Teams

✓ Team Submissions

✓ Evaluation Forms

✓ Task Assignment

✓ Session Dashboard

✓ Session History

Mentor users cannot:

✗ Delete Teams

✗ Create Tracks

✗ Edit Website

✗ Access Admin Settings

✗ View Other Mentor Draft Evaluations (unless explicitly allowed)

---

# 6. Admin Access

Admin has unrestricted access.

Admin can:

✓ Manage Teams

✓ Manage Mentors

✓ Manage Tracks

✓ Manage Sponsors

✓ Publish Announcements

✓ Publish Results

✓ Edit Website Content

✓ Manage Leaderboards

✓ Manage Settings

✓ View Analytics

✓ Export Data

---

# 7. Authentication Methods

Supported

✓ Google Login

✓ Email + Password

Future

Magic Link

Microsoft Login

GitHub Login

---

# 8. Registration Flow

User clicks Register

↓

Select Team Registration

↓

Enter Details

↓

Email Verification

↓

Supabase creates account

↓

Database record created

↓

Redirect to Dashboard

---

# 9. Login Flow

User enters credentials

↓

Supabase Authentication

↓

JWT Issued

↓

Role Retrieved

↓

Redirect based on Role

Admin

↓

/admin

Mentor

↓

/mentor

Team

↓

/team

---

# 10. Session Management

Supabase manages:

JWT

Refresh Token

Session Expiration

Token Refresh

Developer responsibilities:

Handle expired sessions

Redirect to login

Display session timeout

---

# 11. Route Protection

Public Routes

No Authentication

Protected Routes

Require Authentication

Admin Routes

Require Admin Role

Mentor Routes

Require Mentor Role

Team Routes

Require Team Role

---

# 12. Middleware Flow

Request

↓

Middleware

↓

Session Exists?

↓

Yes

↓

Read Role

↓

Role Valid?

↓

Continue

↓

Page

Else

↓

Redirect Login

---

# 13. Access Matrix

Page                     Visitor  Team  Mentor  Admin

Home                        ✓      ✓      ✓       ✓

Leaderboard                 ✓      ✓      ✓       ✓

Results                     ✓      ✓      ✓       ✓

Login                       ✓      ✗      ✗       ✗

Register                    ✓      ✗      ✗       ✗

Team Dashboard              ✗      ✓      ✗       ✗

Mentor Dashboard            ✗      ✗      ✓       ✗

Admin Dashboard             ✗      ✗      ✗       ✓

Submission                  ✗      ✓      ✓       ✓

Scores                      ✗      ✓      ✓       ✓

Tasks                       ✗      ✓      ✓       ✓

Announcements               ✓      ✓      ✓       ✓

---

# 14. Password Policy

Minimum

8 Characters

Required

Uppercase

Lowercase

Number

Special Character

---

# 15. Forgot Password Flow

Forgot Password

↓

Enter Email

↓

Supabase Email

↓

Reset Link

↓

Create New Password

↓

Login

---

# 16. Email Verification

Registration

↓

Verification Email

↓

Verified

↓

Dashboard Access

Unverified users cannot continue.

---

# 17. Google Login Flow

Click Google Login

↓

OAuth

↓

Google Consent

↓

Supabase

↓

Account Created

↓

Dashboard

---

# 18. Logout Flow

User clicks Logout

↓

Supabase Session Removed

↓

Cookies Cleared

↓

Redirect Home

---

# 19. Session Timeout

Inactive Session

↓

Warning

↓

Session Refresh

↓

If expired

↓

Logout

---

# 20. Security Rules

Passwords never stored manually.

JWT never manually modified.

Never trust client role.

Always verify server-side.

Always use HTTPS.

Enable CSRF protection where applicable.

Validate all inputs.

---

# 21. Row Level Security (RLS)

Users

Can read only their own record.

Teams

Can update only their own profile.

Mentors

Can create evaluations only for assigned teams.

Admins

Full CRUD.

---

# 22. Account Status

Possible States

Active

Pending Verification

Suspended

Disabled

Deleted

Inactive

---

# 23. Login UI

Dark Theme

Glassmorphism Card

Animated Inputs

Google Button

Email Button

Password Visibility Toggle

Forgot Password Link

Remember Me

Loading Animation

---

# 24. Error Handling

Invalid Password

Incorrect Email

Email Already Exists

Weak Password

Network Error

Session Expired

Friendly messages only.

Never expose backend errors.

---

# 25. Authentication Events

Login

Logout

Register

Password Reset

Email Verification

Session Refresh

Each event stored in Activity Logs.

---

# 26. Future Features

Two Factor Authentication

Passkeys

OTP Login

College SSO

Face Authentication

---

# 27. Best Practices

Never store passwords.

Never expose JWT.

Always use HTTPS.

Always validate permissions.

Always use RLS.

Never trust frontend.

Least Privilege Principle.

---

# 28. Success Criteria

✓ Secure Authentication

✓ Role Isolation

✓ Session Persistence

✓ Protected Routes

✓ Zero Unauthorized Access

✓ Easy Login Experience

---

End of Document