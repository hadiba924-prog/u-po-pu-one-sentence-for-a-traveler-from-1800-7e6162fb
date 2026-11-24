// One Sentence for a Traveler from 1800 — make.fun bounty entry.
//
// The program writes a single sentence (at most 200 characters) that
// explains the modern internet to a time traveler who has just stepped
// out of the year 1800, using only words and things a person of that
// year would already know: a road, a letter, a library, ink, a chair.
//
// The sentence is one comparison — a road joining every house — and
// the road carries the two things the internet is mostly used for:
// letters that arrive at once, and books from any library.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry sentence. Every word in it existed in 1800.
const SENTENCE =
  "It is a road joining every house on earth, where a letter arrives before the ink dries and a book from any library can be read from your own chair.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Count characters (code points), not UTF-16 code units, so the guard
// matches the gate's 1-to-200-character rule exactly.
const length = [...SENTENCE].length;
if (length < 1 || length > 200) {
  throw new Error(
    `entry must be 1 to 200 characters, got ${length}: ${JSON.stringify(SENTENCE)}`,
  );
}

// The task asks for ONE sentence: a single terminal full stop, and no
// line break or second sentence hiding inside the text. Fail loudly
// rather than ship a malformed entry.
const terminalStops = (SENTENCE.match(/[.!?]/g) ?? []).length;
if (terminalStops !== 1 || !SENTENCE.endsWith(".") || /\n/.test(SENTENCE)) {
  throw new Error(
    `entry must be exactly one sentence with no line breaks: ${JSON.stringify(SENTENCE)}`,
  );
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), SENTENCE, "utf8");
