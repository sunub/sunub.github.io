"use client";

import { AlertCircle, ChevronsDown } from "lucide-react";
import {
	StatusButton,
	StatusCaption,
	StatusCard,
	StatusDetail,
	StatusIconSlot,
	StatusItem,
	StatusPulse,
	StatusPulseRing,
} from "./style";

interface InfiniteScrollStatusProps {
	mode: "loading" | "error";
	caption: string;
	detail?: string;
	retryLabel?: string;
	onRetry?: () => void;
}

export function InfiniteScrollStatus({
	mode,
	caption,
	detail,
	retryLabel = "다시 시도",
	onRetry,
}: InfiniteScrollStatusProps) {
	const icon =
		mode === "loading" ? (
			<ChevronsDown size={22} strokeWidth={2.2} />
		) : (
			<AlertCircle size={20} strokeWidth={2.2} />
		);

	return (
		<StatusItem>
			<StatusCard
				$mode={mode}
				aria-live={mode === "loading" ? "polite" : undefined}
				role={mode === "error" ? "alert" : undefined}
			>
				<StatusPulse $mode={mode} aria-hidden="true">
					{mode === "loading" ? <StatusPulseRing /> : null}
					<StatusIconSlot $mode={mode}>{icon}</StatusIconSlot>
				</StatusPulse>
				<StatusCaption>{caption}</StatusCaption>
				{detail ? <StatusDetail>{detail}</StatusDetail> : null}
				{mode === "error" && onRetry ? (
					<StatusButton type="button" onClick={onRetry}>
						{retryLabel}
					</StatusButton>
				) : null}
			</StatusCard>
		</StatusItem>
	);
}
