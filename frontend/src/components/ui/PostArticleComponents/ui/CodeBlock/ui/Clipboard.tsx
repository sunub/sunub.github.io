"use client";

import { ClipboardCheck, Clipboard as ClipboardIcon } from "lucide-react";
import { useState } from "react";
import { ClipboardButton } from "../style";

export function Clipboard({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		if (copied) {
			return;
		}
		navigator.clipboard
			.writeText(text)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 3000);
			})
			.catch(() => {
				//
			});
	};

	return (
		<ClipboardButton onClick={handleCopy} aria-label="Copy to clipboard">
			{copied ? (
				<ClipboardCheck className="text-green-500" />
			) : (
				<ClipboardIcon className="text-gray-500" />
			)}
		</ClipboardButton>
	);
}
