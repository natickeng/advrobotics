# Decisions

1. **2026-08-15** — advrobotics: Created PROJECT.md/DECISIONS.md to track this repo as a project thread. No content decisions yet.

2. **2026-08-15** — advrobotics: **`builder/` is the shared `rsalemiTeaches/guide-builder` submodule**, not a repo-local copy. This is the same builder `nhsengineering` pins at its own `builder/` (see that repo's DECISIONS #11, which reversed an earlier per-course-copy approach after drift caused real bugs). advrobotics pins commit `258989c` — its current `master` at setup time. Bumping the pin later means rebuilding and eyeballing any guides in both repos, per the shared builder's own rules.
