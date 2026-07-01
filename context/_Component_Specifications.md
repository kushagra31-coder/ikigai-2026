# 22_Component_Specifications.md

# IKIGAI 2026

Component Design System

Version

1.0

Purpose

Define every reusable UI component.

Every page must be built using these components.

No duplicate UI.

---

# Design Principles

Reusable

Composable

Accessible

Responsive

Theme Aware

Animation Ready

Type Safe

---

================================================

BUTTON

================================================

Component

<Button />

Purpose

Primary interaction.

Variants

Primary

Secondary

Ghost

Outline

Danger

Success

Sizes

Small

Medium

Large

Icon

States

Idle

Hover

Active

Loading

Disabled

Animations

Hover Glow

Scale

Click Compression

Accessibility

Keyboard

ARIA

Focus Ring

---

================================================

CARD

================================================

Component

<Card />

Purpose

Container

Variants

Glass

Solid

Gradient

Statistic

Profile

Hover

Lift

Glow

Border Animation

---

================================================

INPUT

================================================

Component

<Input />

Supports

Text

Email

Password

Number

Search

URL

Validation

Built-in

Floating Label

Yes

Icons

Left

Right

Password Toggle

Supported

---

================================================

TEXTAREA

================================================

Auto Resize

Character Counter

Validation

Max Length

---

================================================

SELECT

================================================

Searchable

Keyboard Support

Multi Select

Future

---

================================================

CHECKBOX

================================================

Animated

Accessible

Controlled

---

================================================

RADIO GROUP

================================================

Animated

Accessible

Keyboard

---

================================================

SWITCH

================================================

Theme

Settings

Toggle

Animated

---

================================================

BADGE

================================================

Variants

Success

Error

Warning

Info

Primary

Secondary

Leaderboard Rank

Task Priority

---

================================================

AVATAR

================================================

Image

Fallback Initial

Online Status

Role Badge

---

================================================

MODAL

================================================

Focus Lock

ESC Close

Click Outside

Animation

Blur Background

Scale

Fade

---

================================================

DRAWER

================================================

Desktop

Side Panel

Mobile

Bottom Sheet

---

================================================

TOAST

================================================

Types

Success

Warning

Info

Error

Auto Close

Manual Close

Progress Bar

Hover Pause

---

================================================

NOTIFICATION CARD

================================================

Icon

Title

Message

Time

Priority

Read Status

Action Button

---

================================================

TABLE

================================================

Sticky Header

Sorting

Filtering

Pagination

Search

Loading Skeleton

Responsive

---

================================================

LEADERBOARD TABLE

================================================

Columns

Rank

Team

Track

Score

Trend

Updated

Features

Realtime

Highlight Changes

Search

Filter

Export

---

================================================

STAT CARD

================================================

Icon

Title

Value

Trend

Mini Chart (Future)

Hover

Lift

---

================================================

COUNTDOWN

================================================

Days

Hours

Minutes

Seconds

Animated Flip

Realtime

---

================================================

TIMELINE

================================================

Vertical

Animated

Icons

Expandable

Future

---

================================================

TASK CARD

================================================

Priority

Deadline

Status

Mentor

Description

Buttons

Accept

Submit

---

================================================

SCORE CARD

================================================

Session

Mentor Average

Overall

Remarks

Rank

Realtime

---

================================================

ANNOUNCEMENT CARD

================================================

Priority

Date

Author

Description

Pinned Badge

---

================================================

SPONSOR CARD

================================================

Logo

Name

Website

Hover

Glow

---

================================================

TRACK CARD

================================================

Track Icon

Title

Description

Difficulty

Button

Hover Animation

---

================================================

FILE UPLOAD

================================================

Drag Drop

Browse

Progress

Validation

Preview

Retry

Supported

ZIP

PPT

Video

PDF

---

================================================

SEARCH BAR

================================================

Debounce

300ms

Keyboard

Suggestions

Future

---

================================================

FILTER BAR

================================================

Dropdown

Chips

Clear

Multiple Filters

---

================================================

SIDEBAR

================================================

Collapsible

Role Based

Animated

Persistent

Desktop

Drawer

Mobile

---

================================================

NAVBAR

================================================

Sticky

Glass

Scroll Hide

Scroll Reveal

Mobile Menu

---

================================================

FOOTER

================================================

Quick Links

Sponsors

Social

Contact

Version

---

================================================

SKELETON

================================================

Cards

Tables

Text

Charts

Avatar

Forms

---

================================================

EMPTY STATE

================================================

Illustration

Title

Description

Action Button

---

================================================

ERROR STATE

================================================

Illustration

Title

Reason

Retry

Home

---

================================================

LOADER

================================================

Intro

Spinner

Progress

Skeleton

Button Loader

Fullscreen Loader

---

================================================

PAGE TRANSITION

================================================

Fade

Slide

Scale

Blur

GPU Accelerated

---

================================================

COMPONENT RULES

Every Component

✔ Dark Theme

✔ Responsive

✔ Accessible

✔ Reusable

✔ Typed

✔ Animated

✔ Tested

✔ Documented

✔ No Business Logic

✔ No Database Access

---

================================================

DEFINITION OF DONE

A component is complete only if

✓ Mobile Ready

✓ Desktop Ready

✓ Keyboard Accessible

✓ Screen Reader Compatible

✓ Animation Included

✓ Error State Exists

✓ Loading State Exists

✓ Dark Theme Compatible

✓ Fully Typed

✓ Reusable

---

End of Document