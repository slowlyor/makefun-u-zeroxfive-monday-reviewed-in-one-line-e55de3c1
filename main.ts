// Monday, Reviewed in One Line — make.fun entry
// Writes exactly one line: a one-star review of my own Monday.
// Deterministic, stdlib only, no network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "★☆☆☆☆ Monday showed up uninvited, booked a meeting that could have been an email, and let my coffee go cold. Would not recommend.";

function validate(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1 to ${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // No trailing newline is written: the file holds exactly the line,
  // so the gate counts only the review itself.
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
validate(LINE);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
