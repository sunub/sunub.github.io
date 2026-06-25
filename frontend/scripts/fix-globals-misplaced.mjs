import fs from "node:fs";
import path from "node:path";

const globalsCssPath = path.resolve("src/app/globals.css");
let content = fs.readFileSync(globalsCssPath, "utf8");

// 1. Remove the misplaced variables block from the input selector.
// The block starts with "  /* Auto-migrated color-mix variables */" and goes down to just before "  display: block;" inside input selector
// Let's locate the input selector with the block
const targetStart = "  /* Auto-migrated color-mix variables */";
const startIndex = content.indexOf(targetStart);

if (startIndex !== -1) {
	// Let's find the "display: block;" after the start index
	const nextDisplayBlockIndex = content.indexOf("display: block;", startIndex);
	if (nextDisplayBlockIndex !== -1) {
		const blockEndIndex = nextDisplayBlockIndex;
		const variablesBlock = content.substring(startIndex, blockEndIndex);

		// Remove it from current place
		content =
			content.substring(0, startIndex) + content.substring(blockEndIndex);

		// 2. Now, create a new rule at the very bottom of globals.css targeting *, *::before, *::after
		// We'll put all the auto-migrated variables in this global wildcard block so they resolve locally on every element.
		const wildcardBlock = `\n\n*, *::before, *::after {\n${variablesBlock}\n}\n`;
		content += wildcardBlock;

		fs.writeFileSync(globalsCssPath, content, "utf8");
		console.log("Fixed globals.css misplaced block!");
	} else {
		console.log("Could not find display: block; after variables start.");
	}
} else {
	console.log("Misplaced variables block not found.");
}
