export type VirtualRenderRange = {
	start: number;
	end: number;
};

export type UseWindowedRangeResult = {
	visibleRange: VirtualRenderRange;
	topSpacerPx: number;
	bottomSpacerPx: number;
	remainingPx: number;
	registerItemElement: (index: number, el: HTMLElement | null) => void;
};

export type WindowedMetrics = Omit<
	UseWindowedRangeResult,
	"registerItemElement"
> & {
	totalHeightPx: number;
};

export type VirtualScrollConfig = {
	estimatedHeight: number;
	overscan: number;
	minRenderCount: number;
	enabled: boolean;
	preloadThresholdPx: number;
};
