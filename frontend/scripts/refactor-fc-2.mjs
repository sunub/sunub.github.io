import fs from "node:fs";
import path from "node:path";

const file = path.resolve("src/components/Main/FreshChronicles/style/index.ts");
let content = fs.readFileSync(file, "utf8");

// Replace all remaining color-mixes using a generic matcher that reads the percentages
content = content.replace(
	/color-mix\(\s*in\s*oklch,\s*var\(--post-card-accent\)\s*12%,\s*transparent\s*\)/g,
	"var(--fc-accent-12)",
);
content = content.replace(
	/color-mix\(\s*in\s*oklch,\s*var\(--post-card-accent\)\s*30%,\s*transparent\s*\)/g,
	"var(--fc-accent-30)",
);
content = content.replace(
	/color-mix\(\s*in\s*oklch,\s*var\(--post-card-surface-base\)\s*84%,\s*var\(--post-card-accent\)\s*16%\s*\)/g,
	"var(--fc-surface-84-accent)",
);
content = content.replace(
	/color-mix\(\s*in\s*oklch,\s*var\(--post-card-accent\)\s*28%,\s*var\(--post-card-surface-base\)\s*72%\s*\)/g,
	"var(--fc-accent-28-surface)",
);
content = content.replace(
	/color-mix\(\s*in\s*oklch,\s*var\(--post-card-accent\)\s*62%,\s*black\s*38%\s*\)/g,
	"var(--fc-accent-62-black)",
);
content = content.replace(
	/color-mix\(\s*in\s*oklch,\s*var\(--post-card-accent\)\s*18%,\s*var\(--post-card-surface-base\)\s*82%\s*\)/g,
	"var(--fc-accent-18-surface)",
);

fs.writeFileSync(file, content, "utf8");
console.log("Done additional replacements");
