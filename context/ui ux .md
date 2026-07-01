# 15_Animations_&_Motion_System.md

# IKIGAI 2026

Animation & Motion Design System

Version 1.0

Animation Philosophy

Premium

Smooth

Purposeful

Minimal

Performance First

---

# 1. Motion Principles

Every animation must

Guide Attention

Provide Feedback

Increase Usability

Feel Premium

Never delay the user.

Animation is communication.

---

# 2. Performance Targets

Target FPS

60 FPS

Animation Delay

<16ms

GPU Accelerated

Yes

Heavy Animations

Landing Page Only

Dashboard

Minimal Motion

---

# 3. Libraries

Primary

Framer Motion

Secondary

GSAP

Smooth Scroll

Lenis

Particles

TSParticles

No CSS-only complex animations.

---

# 4. Website Intro Animation

Reference

Netflix Intro

Apple Event Intro

Duration

3.5 Seconds

Skippable

Yes

Only Once Per Browser

Yes

---

Timeline

0.0 sec

Entire Screen Black

↓

0.3 sec

Purple Ambient Glow appears

↓

0.5 sec

IKIGAI Logo fades in

Scale

0.85

↓

0.9 sec

Logo becomes sharp

↓

1.2 sec

Soft Pulse

↓

1.7 sec

Glow expands

↓

2.2 sec

Logo slowly shrinks

↓

2.8 sec

Background particles appear

↓

3.0 sec

Logo fades

↓

3.2 sec

Navbar slides down

↓

3.3 sec

Hero text fades upward

↓

3.4 sec

Buttons appear

↓

3.5 sec

Website interactive

---

# 5. Hero Section Animation

Headline

Fade Up

Subtitle

Fade Up

Buttons

Scale + Fade

Countdown

Slide Up

Background

Always Moving

---

# 6. Navbar

On Load

Slides Down

On Scroll Down

Hide

On Scroll Up

Reveal

Glass Blur

Always

---

# 7. Scroll Animations

Every Section

Hidden

↓

Viewport

↓

Fade Up

↓

Scale

↓

Fully Visible

Only once.

---

# 8. Card Animation

Initial

Opacity

0

Y

30px

↓

Visible

Opacity

1

Y

0

Duration

0.5 sec

---

Hover

Lift

Glow

Scale

1.02

---

# 9. Buttons

Hover

Glow

↓

Scale

1.05

↓

Shadow

↓

Pointer

Click

Scale

0.96

Release

Normal

---

# 10. Inputs

Focus

Purple Border

Glow

Floating Label

Validation

Shake

Error

Success

Green Glow

---

# 11. Tables

Rows

Fade

Stagger

Hover

Highlight

Selected

Border Glow

---

# 12. Leaderboard

Realtime Rank Change

Current Row

↓

Glow

↓

Slide

↓

New Position

↓

Highlight

Duration

400ms

---

# 13. Notification

Toast

Slides from Right

↓

Stops

↓

Progress Bar

↓

Auto Close

5 Seconds

Hover

Pause Timer

---

# 14. Sidebar

Desktop

Slide

Mobile

Drawer

Open

300ms

Close

250ms

---

# 15. Modals

Background

Blur

↓

Modal

Scale

↓

Fade

↓

Focus Trap

Close

Reverse

---

# 16. Loading Animation

Skeleton

Cards

Tables

Charts

No spinner if loading <300ms

Spinner only for longer requests.

---

# 17. Button Loading

Button Disabled

↓

Spinner

↓

Success Checkmark

↓

Normal

---

# 18. Page Transition

Current Page

Fade

↓

Overlay

↓

Next Page

Fade In

Duration

500ms

---

# 19. Background

Animated Gradient

Mesh

Particles

Mouse Parallax

Noise Texture

Never Static

---

# 20. Mouse Effects

Desktop Only

Glow Cursor

Follower Dot

Magnetic Buttons

Disabled

Touch Devices

---

# 21. Countdown

Digits

Flip Animation

Every Second

Smooth

Never jump.

---

# 22. Statistics

Counter

0

↓

Target

Easing

Spring

---

# 23. Timeline

Line

Draw Animation

Cards

Alternate

Left Right

Scroll Trigger

---

# 24. FAQ

Accordion

Expand

Height Animation

Rotate Icon

180°

---

# 25. Search

Typing

Debounce

Results

Fade

No Layout Shift

---

# 26. Progress Bars

Grow

Left to Right

Animated

Percentage

Smooth

---

# 27. Charts

Animate Once

Hover Tooltip

Fade

Scale

---

# 28. Empty States

Illustration

↓

Message

↓

CTA Button

Fade Up

---

# 29. Error Pages

404

Robot Animation

500

Pulse Icon

Retry Button

---

# 30. Success States

Green Check

Scale

Confetti

Major Actions Only

Examples

Registration Complete

Hackathon Winner

---

# 31. Mobile Motion

Reduced Motion

Short Duration

No Cursor Effects

Battery Friendly

---

# 32. Accessibility

Supports

prefers-reduced-motion

Disable

Heavy Motion

Maintain

Functionality

---

# 33. Performance Rules

Use Transform

Use Opacity

Avoid Width Animation

Avoid Height Animation

Avoid Layout Thrashing

Avoid Continuous Re-renders

---

# 34. Motion Timing

Hover

150ms

Cards

250ms

Sections

500ms

Hero

1200ms

Intro

3500ms

---

# 35. Motion Curves

easeOutExpo

easeInOut

Spring

Never Linear

---

# 36. Future Motion

3D Background

WebGL

Three.js

AI Generated Background

Live Particle Physics

Voice Reactive Motion

---

# 37. Success Criteria

✓ 60 FPS

✓ Smooth

✓ Accessible

✓ Mobile Friendly

✓ Premium Feel

✓ Consistent Across Platform

---

End of Document

# 17_UI_Wireframes_&_Screen_Flow.md

# IKIGAI 2026

UI Wireframes & Screen Specifications

Version 1.0

Platform

Mobile First

Desktop Optimized

---

# 1. Design Principles

Every page must answer

Who am I?

Where am I?

What can I do next?

Every page must have

Header

Primary Content

Quick Actions

Footer (if applicable)

No empty spaces.

No decorative clutter.

---

=================================================
PUBLIC WEBSITE
=================================================

# Landing Page

┌───────────────────────────────────────┐
│                                       │
│         IKIGAI LOGO                   │
│                                       │
└───────────────────────────────────────┘

↓

Intro Animation Ends

↓

-------------------------------------------------

Navbar

Logo

Home

About

Tracks

Timeline

Leaderboard

Sponsors

FAQ

Login

Register

-------------------------------------------------

Hero

Huge Title

Subtitle

Countdown

Register Button

Learn More Button

Animated Background

↓

Statistics

↓

Tracks

↓

Timeline

↓

Sponsors

↓

Leaderboard Preview

↓

FAQ

↓

Footer

---

# Hero

Left

Heading

Subheading

Buttons

Countdown

Right

Animated AI Illustration

Background

Particles

Gradient

Glow

---

# Tracks

5 Interactive Cards

Hover

Glow

Expand

Button

Read More

---

# Timeline

Vertical

Animated

Cards

Dates

Icons

---

# Sponsors

Responsive Grid

Logo

Name

Website

Hover

Scale

---

# FAQ

Accordion

Search

Category Filter

---

=================================================

LOGIN

=================================================

Centered Card

Logo

↓

Google Login

↓

Divider

↓

Email

Password

↓

Forgot Password

↓

Login Button

↓

Register Link

Background

Animated Gradient

---

=================================================

REGISTER

=================================================

Wizard

Step 1

Team

↓

Step 2

Leader

↓

Step 3

Members

↓

Step 4

Track

↓

Step 5

Review

↓

Submit

Progress Indicator

Always Visible

---

=================================================
TEAM DASHBOARD
=================================================

Header

↓

Welcome Card

↓

Statistics

↓

Current Session

↓

Tasks

↓

Submission

↓

Scores

↓

Announcements

↓

Timeline

---

Sidebar

Dashboard

Submission

Tasks

Scores

Announcements

Profile

Logout

---

Submission Page

GitHub

PPT

Video

ZIP

Description

Submit

Save Draft

---

Tasks

Cards

Priority

Deadline

Status

Complete Button

---

Scores

Session Cards

↓

Overall Card

↓

Mentor Remarks

↓

Rank

---

Profile

Team Details

Members

Track

Edit

Before Registration Ends

---

=================================================
MENTOR DASHBOARD
=================================================

Header

↓

Statistics

↓

Assigned Teams

↓

Evaluation Panel

↓

Activity Feed

---

Split Layout

-------------------------------------------

Teams

Evaluation Form

-------------------------------------------

Left

Team List

Right

Evaluation

---

Evaluation

Creativity

Originality

Presentation

Feasibility

Functionality

Remarks

Task

Submit

Save Draft

---

=================================================
ADMIN DASHBOARD
=================================================

Command Center

↓

Statistics

↓

Live Feed

↓

Quick Actions

↓

Modules

---

Statistics

Teams

Participants

Mentors

Evaluations

Announcements

Leaderboard

System Status

---

Modules

Teams

Mentors

Tracks

Sessions

Sponsors

Announcements

Analytics

Users

Settings

---

=================================================
LEADERBOARD
=================================================

Tabs

AI

Cyber

Healthcare

Agriculture

IoT

Overall

↓

Search

↓

Filters

↓

Table

Rank

Team

Track

Score

Trend

Updated

Sticky Header

Realtime

---

=================================================
NOTIFICATIONS
=================================================

Bell

↓

Dropdown

↓

Unread

↓

Read

↓

Mark All Read

↓

History

---

=================================================
MOBILE LAYOUT
=================================================

Bottom Navigation

Home

Leaderboard

Notifications

Profile

Menu

Sidebar

↓

Drawer

Cards

↓

Stacked

Tables

↓

Cards

Animations

↓

Reduced

---

=================================================
DESKTOP LAYOUT
=================================================

Sidebar

Persistent

Content

Grid

Statistics

Row

Tables

Wide

Modals

Centered

Leaderboard

Full Width

---

=================================================
COMMON COMPONENTS
=================================================

Navbar

Sidebar

Footer

Buttons

Cards

Dialogs

Inputs

Dropdown

Search

Tables

Badges

Toasts

Skeleton

Avatar

Progress Bar

Countdown

Timeline

Charts

Loader

---

=================================================
PAGE LOADING
=================================================

Page Requested

↓

Skeleton

↓

Data

↓

Animation

↓

Interactive

Never show blank pages.

---

=================================================
EMPTY STATES
=================================================

No Tasks

No Scores

No Submission

No Announcement

Illustration

↓

Title

↓

Description

↓

Action Button

---

=================================================
ERROR STATES
=================================================

404

500

Offline

Permission Denied

Expired Session

Every page has

Retry

Go Home

Contact Support

---

=================================================
SUCCESS STATES
=================================================

Registration Complete

Submission Uploaded

Evaluation Submitted

Task Completed

Announcement Published

Green Check Animation

---

=================================================
COMPONENT REUSE

Buttons

100%

Cards

100%

Forms

100%

Tables

100%

Dialogs

100%

Badges

100%

Everything reusable.

---

End of Document