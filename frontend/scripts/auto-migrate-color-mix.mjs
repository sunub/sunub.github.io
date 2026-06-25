import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const srcDir = path.resolve("src");
const globalsCssPath = path.resolve("src/app/globals.css");

function getFiles(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		file = path.join(dir, file);
		const stat = fs.statSync(file);
		if (stat?.isDirectory()) {
			results = results.concat(getFiles(file));
		} else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
			// Exclude GlobalStyle.ts because it just sets up global css, actually we can include it
			results.push(file);
		}
	});
	return results;
}

const files = getFiles(srcDir);
const _colorMixRegex = /color-mix\(\s*in\s*oklch,\s*([^)]+)\)/g;
// Since nested parentheses might exist (like var(...)), a simple regex might fail.
// We need a balanced parentheses matcher.
function findColorMixes(content) {
	const mixes = [];
	let index = 0;
	while (true) {
		index = content.indexOf("color-mix(", index);
		if (index === -1) {
			break;
		}
		let openCount = 0;
		let endIndex = index + 9; // right before '('
		let found = false;
		for (let i = index + 9; i < content.length; i++) {
			if (content[i] === "(") openCount++;
			if (content[i] === ")") {
				openCount--;
				if (openCount === 0) {
					endIndex = i;
					found = true;
					break;
				}
			}
		}
		if (found) {
			const fullMatch = content.substring(index, endIndex + 1);
			mixes.push({ match: fullMatch, index, length: fullMatch.length });
			index = endIndex + 1;
		} else {
			index += 10;
		}
	}
	return mixes;
}

const varMap = new Map();
const _varCounter = 1;

for (const file of files) {
	let content = fs.readFileSync(file, "utf8");
	const originalContent = content;
	const mixes = findColorMixes(content);

	if (mixes.length > 0) {
		// Process backwards to not mess up indices
		for (let i = mixes.length - 1; i >= 0; i--) {
			const mix = mixes[i];
			let varName;
			// normalize whitespace for map key
			const normalizedMatch = mix.match.replace(/\s+/g, " ").trim();

			if (varMap.has(normalizedMatch)) {
				varName = varMap.get(normalizedMatch);
			} else {
				varName = `--cm-${crypto.createHash("md5").update(normalizedMatch).digest("hex").substring(0, 8)}`;
				varMap.set(normalizedMatch, { varName, originalMatch: mix.match });
			}

			content =
				content.substring(0, mix.index) +
				`var(${varName})` +
				content.substring(mix.index + mix.length);
		}

		if (content !== originalContent) {
			fs.writeFileSync(file, content, "utf8");
		}
	}
}

if (varMap.size > 0) {
	let globalsContent = fs.readFileSync(globalsCssPath, "utf8");
	const insertionIndex = globalsContent.lastIndexOf("display: block;");
	if (insertionIndex !== -1) {
		let varDefinitions = "\n  /* Auto-migrated color-mix variables */\n";
		for (const [_key, value] of varMap.entries()) {
			varDefinitions += `  ${value.varName}: ${value.originalMatch.replace(/\n/g, " ")};\n`;
		}

		globalsContent =
			globalsContent.substring(0, insertionIndex) +
			varDefinitions +
			"\n  " +
			globalsContent.substring(insertionIndex);
		fs.writeFileSync(globalsCssPath, globalsContent, "utf8");
		console.log(
			`Successfully migrated ${varMap.size} unique color-mix usages.`,
		);
	}
} else {
	console.log("No remaining color-mixes found.");
}
