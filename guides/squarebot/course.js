// What the {{PLACEHOLDERS}} in the advrobotics squarebot guides stand for.
//
// The builder is shared with nhsengineering and nhsrobotics and carries none
// of this text. It is called with the guide's frontmatter, which is how
// SAVE and GRADING can vary by stage without the builder knowing any of
// these stages exist.
//
// advrobotics runs as a self-directed seminar (not "survey"):
// four students, each building their own individual robot, checked in on
// 1-2x per 80-minute block rather than taught directly. The three
// experienced students are expected to bring the newest member of the
// team along; that expectation is baked into GRADING below rather than
// policed separately — see PROJECT.md / DECISIONS.md for the reasoning.

const SAVE_BY_STAGE = {
  "01":
    "Save your OnShape document as \"Squarebot - <your name>\" inside the " +
    "class TETRIX library project you've been given access to. Work in your own " +
    "document. Do not edit a teammate's copy, even to help — if you want to " +
    "show someone something, do it in your own document where it does not " +
    "overwrite their work.",

  "02":
    "Nothing to save digitally for this stage. Bring your assembled chassis " +
    "to your demo — that is the artifact.",

  "03":
    "Save your Arduino sketch as movement_<your name>.ino in your own " +
    "sketch folder. Keep every version that runs, even the rough ones — " +
    "Ollama works better when it can see what you already tried.",

  "04":
    "Save your Arduino sketch as controller_<your name>.ino in your own " +
    "sketch folder, building on your movement sketch rather than starting " +
    "over.",

  "05":
    "Save your Arduino sketch as autonomous_<your name>.ino in your own " +
    "sketch folder, building on your controller sketch's motor-power code.",
};

const GRADING_TAIL =
  "The work is 19 points, undone is 0. Late is your points × 0.9. No " +
  "artifact or no demo is a 0 and a redo. Work at your own speed and " +
  "watch the due dates.";

// No per-project stretch goal. Flex is a single, term-wide, all-or-nothing
// team bonus: if all four of you deliver every project on time, the flex
// point applies to every checkoff, for everyone. One team, one flex.
const FLEX_NOTE =
  "There's no separate flex challenge on this project. The flex point is " +
  "shared across the whole team, once, for the whole term: if all four " +
  "of you deliver every project on time, the flex point applies to every " +
  "checkoff — yours and everyone else's. One team, one flex, all or " +
  "nothing.";

const GRADING_BY_STAGE = {
  "01":
    "One checkoff: demo your finished OnShape assembly. No explanation " +
    "required — just the model, correctly assembled from the class " +
    "TETRIX library. " + GRADING_TAIL + " " + FLEX_NOTE,

  "02":
    "One checkoff: demo your assembled robot. It should match your " +
    "approved OnShape design — same parts, same layout. " +
    GRADING_TAIL + " " + FLEX_NOTE,

  "03":
    "One checkoff: demo the movement test and it passes. No code " +
    "walkthrough — the test passing is the proof. " +
    GRADING_TAIL + " " + FLEX_NOTE,

  "04":
    "One checkoff: demo the controller test and it passes. No code " +
    "walkthrough — the test passing is the proof. " +
    GRADING_TAIL + " " + FLEX_NOTE,

  "05":
    "One checkoff: demo the autonomous test and it passes. No code " +
    "walkthrough — the test passing is the proof. This is the Term 1 " +
    "goal: an autonomous robot, actually moving. " +
    GRADING_TAIL + " " + FLEX_NOTE,
};

module.exports = meta => ({
  SAVE: SAVE_BY_STAGE[meta.number] ||
    "Save your work before you demo it.",
  GRADING: GRADING_BY_STAGE[meta.number] ||
    "One checkoff. " + GRADING_TAIL,
});
