export type WindowedMetrics = Omit<
	UseWindowedRangeResult,
	"registerItemElement"
>;

export type VirtualRenderRange = {
	start: number;
	end: number;
};

export type WindowedRangeDebugSample = {
	timestamp: number;
	rangeUpdateMs: number;
	viewportStart: number;
	viewportEnd: number;
	visibleRange: VirtualRenderRange;
	topSpacerPx: number;
	bottomSpacerPx: number;
	totalHeightPx: number;
	remainingPx: number;
	estimatedHeight: number;
	preloadThresholdPx: number;
	itemCount: number;
	measuredCount: number;
	pendingCount: number;
};

export type VirtualScrollConfig = {
	estimatedHeight: number;
	overscan: number;
	minRenderCount: number;
	enabled: boolean;
	preloadThresholdPx: number;
	onMetrics?: (sample: WindowedRangeDebugSample) => void;
};

export type UseWindowedRangeResult = {
	visibleRange: VirtualRenderRange;
	topSpacerPx: number;
	bottomSpacerPx: number;
	totalHeightPx: number;
	remainingPx: number;
	registerItemElement: (index: number, el: HTMLElement | null) => void;
};
