# advrobotics

## Repos involved

- **advrobotics** — NHS Advanced Robotics Class Resources (this repo). Currently just a README; no other content yet. Also an Obsidian vault (has a `.obsidian/` config folder) — notes/content here should follow Obsidian conventions (wikilinks, etc.) where applicable.

## Current unit / topic

Not started yet.

## What's done

- Repo initialized with README.
- **`builder/` added as a submodule of `rsalemiTeaches/guide-builder`**, the
  shared guide builder also used by `nhsengineering` (pinned there at
  `builder/`, see that repo's DECISIONS #11). Pinned here at commit `258989c`
  (its current `master`). `npm install` has been run in `builder/` so it's
  ready to use. Guides should live under `guides/<unit>/` (markdown, `images/`,
  a required `course.js`) and be built by running `../../builder/build-all.sh`
  from that folder — see `builder/README.md` for the full contract.
  Commit made locally; **not yet pushed** (this sandbox has no GitHub push
  credentials — push from your machine when ready).

## What's open

- Everything else — no units, lessons, or `guides/` content have been added
  yet.

## Paths not taken

(none yet)

## Sandbox setup

(none needed)
