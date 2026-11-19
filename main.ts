// News-image entry for 19 November 2026. The finished front page lives in
// entry.png next to this file; the program only copies it into the output
// directory, so running it twice writes byte-identical files.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const src = new URL("./entry.png", import.meta.url);
if (!existsSync(src)) {
  throw new Error("entry.png is missing next to main.ts");
}
// entry.png is a JPEG by magic bytes (the rules allow PNG or JPEG under
// this name); copy it verbatim so the output is byte-identical every run.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
if (statSync(join(outDir, "entry.png")).size !== statSync(src).size) {
  throw new Error("entry.png copy is incomplete");
}
