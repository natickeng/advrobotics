# advrobotics

## Repos involved

- **advrobotics** — NHS Advanced Robotics Class Resources (this repo). An
  Obsidian vault (has a `.obsidian/` config folder) — notes/content here
  should follow Obsidian conventions (wikilinks, etc.) where applicable.
  Holds the squarebot project guides (`guides/squarebot/`) and class
  reference material (`Technical Information/`).

## Current unit / topic

The **squarebot project** — the first project for advrobotics' 4-student
self-directed seminar. A 5-stage pipeline: OnShape design → build →
program movement → program with controller → program autonomous
movement. Goal: autonomous robots moving by the end of Term 1
(2026-10-30, per the captured Red/Blue calendar). Guides for all 5 stages
are drafted, built, and deployed; content is explicitly a first draft Ray
plans to refine.

## What's done

- Repo initialized with README.
- **`builder/` added as a submodule of `rsalemiTeaches/guide-builder`**, the
  shared guide builder also used by `nhsengineering` (pinned there at
  `builder/`, see that repo's DECISIONS #11). Pinned here at commit `258989c`
  (its current `master`). `npm install` has been run in `builder/` so it's
  ready to use. Guides live under `guides/<unit>/` (markdown, `images/`,
  a required `course.js`) and are built by running `../../builder/build-all.sh`
  from that folder — see `builder/README.md` for the full contract.
  ~~Commit made locally; not yet pushed (this sandbox has no GitHub push
  credentials).~~ — 2026-08-15: pushed. Ray committed `PROJECT.md`,
  `DECISIONS.md`, and `.obsidian/` directly (commit `fab3ed2`, "initial
  setup"), and `origin/main` matched local exactly at that point.
  — 2026-08-15 (later same day): repo made public on GitHub, verified
  `origin/main` still matches `fab3ed2` via `git fetch`.
  ~~Nothing has been committed since; see "What's open" below for what's
  now sitting uncommitted in the working tree.~~ — 2026-08-15 (end of day):
  Ray committed and pushed everything (`8e980fb`, "now with intial project
  files") — `.gitignore`, `Technical Information/`, `guides/squarebot/`,
  and the PROJECT.md/`.obsidian/workspace.json` edits are all in. Verified
  clean working tree and `origin/main` matching HEAD via `git fetch`.
- Captured `Red Blue 2627 Calendar.xlsx` into
  `Technical Information/red-blue-2026-2027-schedule-calendar.md` — full
  2026-2027 Red/Blue cycle calendar, holidays/breaks, and per-course due
  dates/exams (Physics Blue 2/Red 2/Red 3, Robotics Red 1, Engineering
  Blue 1). Confirmed advrobotics meets on the same block/cycle as
  Robotics Red 1 (11 R1-cycle sessions between school start and Term 1's
  end on 10/30).
- `Technical Information/` also holds a NotebookLM PRIZM/TETRIX hardware
  reference doc (predates this session's other work there).
- Squarebot project scoped end to end: seminar format ("you are in an
  adult class now" — self-directed, 1-2 demos per 80-minute block, no
  instructor-led teaching); 4 students each building an individual robot;
  grading reuses nhsrobotics' 19/20-point checkoff system verbatim (late
  = points × 0.9); no per-project flex — flex is a single term-wide,
  all-four-students-on-time team bonus applied to every checkoff; no
  anti-takeover mentorship safeguards (deliberate, trust-based call).
- 5 guides built at `guides/squarebot/`: `p01.md` (OnShape design) through
  `p05.md` (autonomous movement), a shared `course.js` (SAVE/GRADING text
  branched by stage number), `deploy.txt` (→ `Advanced Robotics/Project
  Guides` in Class Development, matching nhsrobotics' pattern), and an
  `images/` folder. All 5 build clean through the shared builder and pass
  `test-build.js`. No student/teacher names appear in the guide text —
  student-facing copy uses "at your demo" / "your teacher" phrasing
  rather than naming Ray or using "check-in."
- Deadline mapping across the 11 available R1-cycle sessions before Term 1
  ends: p01 by 9/14, p02 by 9/25, p03 by 10/1, p04 by 10/7, p05 by 10/26,
  demo/buffer on 10/30.
- Fixed a font bug in the guide PDFs: `Roboto Mono` (the code-block font
  `builder/build.js` expects) wasn't installed in the sandbox that built
  them, so LibreOffice silently substituted a non-monospace serif font
  instead. Installed Roboto Mono in-session and confirmed the fix via
  `pdffonts`; Ray separately installed it on his own Mac
  (`brew install --cask font-roboto-mono`) and confirmed it renders
  correctly there too.
- Deployed all 5 guide PDFs to `Class Development/Advanced Robotics/Project
  Guides` (that folder was attached mid-session; deploy confirmed working
  via `build-all.sh -d`).
- Added a root `.gitignore` (advrobotics had none before) for
  `guides/**/*.pdf` and `.docx`, matching nhsrobotics' convention.

## What's open

- **`.obsidian/workspace.json` is committed here**, unlike `nhsengineering`
  (which gitignores it as per-machine layout — see that repo's DECISIONS #9).
  Still not decided whether advrobotics should follow the same convention;
  never came up this session either.
- The squarebot guides are an explicit **first draft** — Ray said he'll use
  them "as my framework to create better versions." Expect content
  (not just mechanics) to keep changing.
- The **4-wheel mecanum + I2C DC expansion module** hardware assumption in
  p01/p02 is unconfirmed against the actual class kit — flagged
  in-guide, not verified with Ray. If the real kit is a simpler 2-motor
  tank drive, p01/p02 (and the mirrored-wheel logic in p05) need rework.
- The Robotics Red 1 due-date pattern (P01-P09) only covers that course's
  own Term 1 — the captured calendar doesn't have later-term data for
  it, so it can't be used to sanity-check advrobotics' own pacing past
  10/30.

## Paths not taken

- **A weighted percentage design rubric** (30/30/20/20 draft, covering
  part selection, structural soundness, completeness, ability to
  explain) — drafted before Ray's actual 19/20 checkoff system (see
  [[reference_grading_system]]) was found in nhsrobotics and reused
  instead.
- **Per-project technical flex challenges** (speed modes, curve-tracing,
  cable management, etc.) — drafted into all 5 guides, then removed
  entirely; replaced with the single term-wide all-four-on-time flex.
- **Anti-takeover mentorship mechanisms** (peer sign-off gates, rotating
  mentor schedules, mandatory design/code explanations) — considered at
  length, explicitly rejected: "If the freshman lets someone do it for
  him, then so be it."
- **Pedro Pathing for autonomous movement** — ruled out early:
  incompatible hardware/toolchain (PRIZM is Arduino-class C++; Pedro
  Pathing needs the Android/Java FTC Control Hub). Native PRIZM C++
  autonomous, closed-loop on the two encoder-equipped wheels (mirrored to
  the other two), used instead.

## Sandbox setup

(none needed)
