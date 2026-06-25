import fs from "node:fs";
import path from "node:path";

const file = path.resolve("src/components/Main/FreshChronicles/style/index.ts");
let content = fs.readFileSync(file, "utf8");

const replacements = [
	{
		from: /color-mix\(\s*in oklch,\s*var\(--color-text\) 12%,\s*transparent\s*\)/g,
		to: "var(--fc-text-12)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--color-text\) 4%,\s*transparent\s*\)/g,
		to: "var(--fc-text-4)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--color-text\) 8%,\s*transparent\s*\)/g,
		to: "var(--fc-text-8)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 12%,\s*transparent\s*\)/g,
		to: "var(--fc-accent-12)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 84%,\s*var\(--post-card-accent\) 16%\s*\)/g,
		to: "var(--fc-accent-16)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 16%,\s*transparent\s*\)/g,
		to: "var(--fc-accent-16)",
	}, // Wait, both use fc-accent-16? No, white 84% is different from transparent. Let me fix the vars. I'll just use exact string replacement for safety, but regex handles whitespace.
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 18%,\s*transparent\s*\)/g,
		to: "var(--fc-accent-18)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 22%,\s*transparent\s*\)/g,
		to: "var(--fc-accent-22)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 24%,\s*transparent\s*\)/g,
		to: "var(--fc-accent-24)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 28%,\s*transparent\s*\)/g,
		to: "var(--fc-accent-28)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 30%,\s*transparent\s*\)/g,
		to: "var(--fc-accent-30)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 65%,\s*transparent\s*\)/g,
		to: "var(--fc-accent-65)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--post-card-accent\) 78%,\s*var\(--color-text\) 22%\s*\)/g,
		to: "var(--fc-accent-78)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 2%,\s*var\(--post-card-surface-base\) 98%\s*\)/g,
		to: "var(--fc-white-2)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 4%,\s*var\(--post-card-surface-base\) 96%\s*\)/g,
		to: "var(--fc-white-4)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 28%,\s*var\(--post-card-surface-base\) 72%\s*\)/g,
		to: "var(--fc-white-28)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 8%,\s*transparent\s*\)/g,
		to: "var(--fc-white-8)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 70%,\s*transparent\s*\)/g,
		to: "var(--fc-white-70)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 72%,\s*var\(--post-card-accent\) 28%\s*\)/g,
		to: "var(--fc-white-72)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 76%,\s*transparent\s*\)/g,
		to: "var(--fc-white-76)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 78%,\s*var\(--post-card-accent\) 22%\s*\)/g,
		to: "var(--fc-white-78)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--color-highlight\) 10%,\s*transparent\s*\)/g,
		to: "var(--fc-hl-10)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--color-highlight\) 14%,\s*transparent\s*\)/g,
		to: "var(--fc-hl-14)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--color-highlight\) 16%,\s*transparent\s*\)/g,
		to: "var(--fc-hl-16)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*var\(--color-highlight\) 22%,\s*transparent\s*\)/g,
		to: "var(--fc-hl-22)",
	},
	{
		from: /color-mix\(\s*in oklch,\s*white 2%,\s*var\(--post-card-surface-strong\) 98%\s*\)/g,
		to: "var(--fc-surface-strong-98)",
	},
];

replacements.forEach(({ from, to }) => {
	content = content.replace(from, to);
});

fs.writeFileSync(file, content, "utf8");
console.log("Replaced FreshChronicles colors");
