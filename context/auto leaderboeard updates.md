# 10_Leaderboard_System.md

# IKIGAI 2026

Leaderboard Engine

Version 1.0

---

# 1. Purpose

The Leaderboard System is responsible for ranking teams throughout the hackathon.

It receives evaluation scores from mentors, calculates rankings automatically, and updates the website in real time.

The leaderboard must always reflect the latest published evaluation data.

It should never require manual editing.

---

# 2. Objectives

• Fair Ranking

• Automatic Calculation

• Real-time Updates

• Transparent Scoring

• Session-wise Evaluation

• Track-wise Ranking

• Overall Ranking

---

# 3. Leaderboard Types

Track Leaderboards

1.

AI & Machine Learning

2.

Cybersecurity

3.

Agriculture & Rural Innovation

4.

Healthcare & MedTech

5.

Smart Cities & IoT

Overall Leaderboard

Overall Champion

Runner Up

Second Runner Up

---

# 4. Score Components

Every mentor gives

Creativity

0–10

Originality

0–10

Presentation

0–10

Feasibility

0–10

Functionality

0–10

Maximum Score

50

---

# 5. Multi-Mentor Evaluation

Each session can have multiple mentors.

Example

Session

Prototype

Mentor A

42

Mentor B

46

Mentor C

44

Average Score

44

Only the average score is considered for that session.

Individual mentor scores remain stored for audit purposes.

---

# 6. Multi-Session Evaluation

Hackathon consists of multiple judging sessions.

Example

Session 1

Idea Validation

42

Session 2

Prototype

46

Session 3

Presentation

44

Overall

Average of Sessions

44

Future versions may support weighted sessions.

Version 1 uses equal weight.

---

# 7. Final Score Formula

Overall Score

=

Average(Session Scores)

Session Score

=

Average(All Mentor Scores)

Mentor Score

=

Creativity

+

Originality

+

Presentation

+

Feasibility

+

Functionality

Maximum

50

---

# 8. Ranking Algorithm

Process

↓

Fetch Published Evaluations

↓

Group by Team

↓

Average Mentor Scores

↓

Average Session Scores

↓

Sort Descending

↓

Assign Rank

↓

Publish

---

# 9. Rank Assignment

Highest Score

↓

Rank 1

↓

Second Highest

↓

Rank 2

↓

Third Highest

↓

Rank 3

---

# 10. Tie Breaking

Priority

Higher Functionality Score

↓

Higher Feasibility Score

↓

Higher Creativity Score

↓

Earlier Submission Time

↓

Admin Review (Final)

Ties should never be broken randomly.

---

# 11. Leaderboard Display

Columns

Rank

Team

Track

Current Score

Trend

Updated At

Example

1

Team Alpha

44

▲

2

Team Sigma

43

▼

3

Team Bravo

41

▬

---

# 12. Trend Indicator

Green

Score Increased

Red

Rank Decreased

Gray

No Change

Animated on update.

---

# 13. Ranking Animation

When rank changes

Card slides

↓

Glow

↓

Position changes smoothly

↓

Animation Duration

400ms

No abrupt jumps.

---

# 14. Auto Update

Whenever mentor publishes evaluation

↓

Realtime Event

↓

Leaderboard Refresh

↓

Team Dashboard Refresh

↓

Public Website Refresh

No page reload.

---

# 15. Visibility

Public

Track Leaderboards

Overall Leaderboard

Private

Draft Scores

Draft Evaluations

Hidden Sessions

---

# 16. Publish Workflow

Mentor

↓

Submit Evaluation

↓

Stored

↓

Session Complete

↓

Admin Reviews (Optional)

↓

Published

↓

Realtime Update

If auto-publish is enabled

↓

Skip Admin Review

---

# 17. Search

Search by

Team

Track

Rank

College

Instant Search

---

# 18. Filters

Track

Session

Top 10

Top 25

Top 50

All

---

# 19. Pagination

Desktop

25 Teams

Mobile

10 Teams

Infinite Scroll

Future

---

# 20. Empty States

No Evaluations

"Leaderboard will be available after judging."

---

# 21. Security

Only published scores visible.

Draft evaluations hidden.

Mentors cannot edit rankings.

Teams cannot edit scores.

Visitors cannot access draft data.

---

# 22. Performance

Ranking Calculation

<300ms

Realtime Update

<1 second

Search

Instant

No duplicate queries.

---

# 23. Realtime Flow

Mentor

↓

Submit Score

↓

Supabase

↓

Leaderboard Function

↓

Updated Rankings

↓

Realtime Broadcast

↓

All Clients Refresh

---

# 24. Database Flow

Evaluations

↓

Average per Mentor

↓

Average per Session

↓

Final Score

↓

Leaderboard View

↓

Frontend

---

# 25. Admin Controls

Admin can

Hide Leaderboard

Publish Leaderboard

Freeze Leaderboard

Unlock Session

Export Rankings

Admin cannot manually change calculated scores.

---

# 26. Export

CSV

Excel

PDF

Track-wise

Overall

---

# 27. Mobile Layout

Rank Badge

Team Name

Score

Trend

Tap to Expand

Shows

Session Scores

Mentor Remarks

---

# 28. Desktop Layout

Table

Sticky Header

Hover Row

Animated Updates

Search

Filters

Export

---

# 29. Components

LeaderboardTable

LeaderboardRow

RankBadge

TrendIndicator

TrackTabs

SearchBar

FilterMenu

ScoreCard

ExportButton

---

# 30. API Flow

Mentor Evaluation

↓

POST Evaluation

↓

Database

↓

Realtime Trigger

↓

Leaderboard Query

↓

Sort

↓

Broadcast

↓

Frontend Update

---

# 31. Edge Cases

Mentor submits duplicate evaluation

Reject

Session locked

Reject

Track hidden

Do not display

Team withdrawn

Exclude from ranking

Deleted evaluation

Recalculate immediately

---

# 32. Auditability

Every published score

Stores

Mentor

Session

Timestamp

Version

Admin Override

History cannot be deleted.

---

# 33. Future Features

AI Performance Analysis

Historical Rankings

Leaderboard Replay

Score Heatmaps

Judge Comparison

Live Stage Display

Audience Mode

---

# 34. Success Criteria

✓ Fair rankings

✓ Transparent calculations

✓ Real-time updates

✓ No manual calculations

✓ Supports multiple mentors

✓ Supports multiple sessions

✓ Mobile friendly

✓ Audit ready

---

End of Document