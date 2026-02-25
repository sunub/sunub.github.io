import { expect, test } from "@playwright/test";
import { HomePage } from "./HomePage";

const WAIT_TIMEOUT = 60_000;
const LOAD_WAIT_TIMEOUT = 20_000;
const DEFAULT_CYCLES = 8;

type MemorySnapshot = {
	usedMB: number | null;
	totalMB: number | null;
	heapLimitMB: number | null;
};

type FetchMeta = {
	url: string;
	startAt: number;
	endAt: number | null;
	durationMs: number | null;
	totalCount: number | null;
	receivedItems: number;
	status: number | null;
	ok: boolean | null;
};

type ListSnapshot = {
	mountedListItems: number;
	renderedListItems: number;
	maxRenderedIndex: number;
	hasLoading: boolean;
	top: number;
	bottom: number;
};

type FrameSnapshot = {
	count: number;
	samples: number[];
};

interface BenchResult {
	cycle: number;
	fetchDurationMs: number | null;
	receivedItems: number;
	totalCount: number | null;
	renderedListItems: number;
	mountedListItems: number;
	heapMB: {
		before: MemorySnapshot;
		after: MemorySnapshot;
		deltaMB: number | null;
	};
	framesPerWindow: {
		count: number;
		avgFrameMs: number;
		maxFrameMs: number;
		p95FrameMs: number;
	};
}

type ScrollPerfState = {
	memory: MemorySnapshot;
	list: ListSnapshot;
	callCount: number;
};

type ScrollPerfRuntime = {
	calls: FetchMeta[];
	clearCalls: () => void;
	getCallCount: () => number;
	getLastCall: () => FetchMeta | null;
	getMemory: () => MemorySnapshot;
	getListStats: () => ListSnapshot;
	startFrameSampling: () => void;
	stopFrameSampling: () => void;
	clearFrameSamples: () => void;
	getFrameSnapshot: () => FrameSnapshot;
};

type ScrollPerfWindow = {
	__scrollPerf: ScrollPerfRuntime;
};

async function stopScrollPerfSampling(
	page: import("@playwright/test").Page,
): Promise<void> {
	if (page.isClosed()) {
		return;
	}

	try {
		await page.evaluate(() => {
			const perf = (window as unknown as ScrollPerfWindow).__scrollPerf;
			perf.stopFrameSampling();
		});
	} catch {
		// Safe no-op: page may already be closing during test teardown.
	}
}

function roundBytesToMB(bytes: number | null): number | null {
	if (bytes === null) return null;
	return Number((bytes / 1024 / 1024).toFixed(2));
}

function roundTo2(num: number | null): number | null {
	if (num === null || Number.isNaN(num)) return null;
	return Number(num.toFixed(2));
}

function computePercentile(values: number[], p: number): number {
	if (!values.length) return 0;
	const sorted = [...values].sort((a, b) => a - b);
	const idx = Math.min(
		Math.max(Math.ceil((p / 100) * sorted.length) - 1, 0),
		sorted.length - 1,
	);
	return Number(sorted[idx].toFixed(2));
}

function calcFrameStats(samples: number[]) {
	if (!samples.length) {
		return {
			count: 0,
			avgFrameMs: 0,
			maxFrameMs: 0,
			p95FrameMs: 0,
		};
	}
	const sum = samples.reduce((acc, value) => acc + value, 0);
	return {
		count: samples.length,
		avgFrameMs: Number((sum / samples.length).toFixed(2)),
		maxFrameMs: Number(Math.max(...samples).toFixed(2)),
		p95FrameMs: computePercentile(samples, 95),
	};
}

async function setupPageMonitors(page: import("@playwright/test").Page) {
	await page.addInitScript(() => {
		type RangeCall = {
			url: string;
			startAt: number;
			endAt: number | null;
			durationMs: number | null;
			totalCount: number | null;
			receivedItems: number;
			status: number | null;
			ok: boolean | null;
		};

		const rangeCalls: Array<RangeCall> = [];
		const frameSamples: number[] = [];
		let frameTimer = 0;
		let isFrameRunning = false;
		let lastFrame = 0;

		const captureMemory = () => {
			const mem = (
				performance as {
					memory?: {
						usedJSHeapSize?: number | null;
						totalJSHeapSize?: number | null;
						jsHeapSizeLimit?: number | null;
					};
				}
			).memory;
			return {
				usedMB: mem?.usedJSHeapSize ?? null,
				totalMB: mem?.totalJSHeapSize ?? null,
				heapLimitMB: mem?.jsHeapSizeLimit ?? null,
			};
		};

		const getListStats = () => {
			const list = document.getElementById("blog-post__recently-post-list");
			if (!list) {
				return {
					mountedListItems: 0,
					renderedListItems: 0,
					maxRenderedIndex: -1,
					hasLoading: false,
					top: 0,
					bottom: 0,
				};
			}

			const postItems = list.querySelectorAll(
				"li[data-testid^='blog-post__recently-'][data-testid$='-post-item']",
			);
			const renderedIndices = Array.from(postItems)
				.map((item) => {
					const itemId = item.getAttribute("data-testid") ?? "";
					const match = /blog-post__recently-(\d+)-post-item/.exec(itemId);
					return match ? Number.parseInt(match[1], 10) : -1;
				})
				.filter((index) => index >= 0);

			return {
				mountedListItems: list.querySelectorAll("li").length,
				renderedListItems: postItems.length,
				maxRenderedIndex:
					renderedIndices.length > 0 ? Math.max(...renderedIndices) : -1,
				hasLoading:
					document.querySelector(
						"[data-testid='blog-post__front-matter-loading']",
					) !== null,
				top: Math.max(0, list.getBoundingClientRect().top),
				bottom: Math.max(0, list.getBoundingClientRect().bottom),
			};
		};

		const startFrameSampling = () => {
			if (isFrameRunning) return;
			isFrameRunning = true;
			lastFrame = 0;
			const rafLoop = (timestamp: number) => {
				if (!isFrameRunning) {
					return;
				}
				if (lastFrame > 0) {
					const delta = timestamp - lastFrame;
					if (delta >= 0 && Number.isFinite(delta)) {
						frameSamples.push(delta);
					}
				}
				lastFrame = timestamp;
				frameTimer = requestAnimationFrame(rafLoop);
			};
			frameTimer = requestAnimationFrame(rafLoop);
		};

		const stopFrameSampling = () => {
			isFrameRunning = false;
			if (frameTimer) {
				cancelAnimationFrame(frameTimer);
			}
		};

		const clearFrameSamples = () => {
			frameSamples.length = 0;
		};

		const frameSnapshot = () => {
			return {
				count: frameSamples.length,
				samples: [...frameSamples],
			};
		};

		const originalFetch = window.fetch.bind(window);
		window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
			const urlString =
				typeof input === "string"
					? input
					: input instanceof URL
						? input.toString()
						: input instanceof Request
							? input.url
							: "";

			if (urlString.includes("/posts/latest/range")) {
				const callMeta: RangeCall = {
					url: urlString,
					startAt: performance.now(),
					endAt: null,
					durationMs: null,
					totalCount: null,
					receivedItems: 0,
					status: null,
					ok: null,
				};

				rangeCalls.push(callMeta);

				return originalFetch(input, init).then((response) => {
					callMeta.endAt = performance.now();
					callMeta.durationMs = callMeta.endAt - callMeta.startAt;
					callMeta.status = response.status;
					callMeta.ok = response.ok;
					return response;
				});
			}

			return originalFetch(input, init);
		}) as typeof fetch;

		(window as unknown as ScrollPerfWindow).__scrollPerf = {
			calls: rangeCalls,
			clearCalls: () => {
				rangeCalls.length = 0;
			},
			getCallCount: () => rangeCalls.length,
			getLastCall: () => rangeCalls[rangeCalls.length - 1] ?? null,
			getMemory: captureMemory,
			getListStats,
			startFrameSampling,
			stopFrameSampling,
			clearFrameSamples,
			getFrameSnapshot: frameSnapshot,
		};
	});
}

async function getCurrentPerfState(
	page: import("@playwright/test").Page,
): Promise<ScrollPerfState> {
	return page.evaluate(() => {
		const perf = (window as unknown as ScrollPerfWindow).__scrollPerf;
		return {
			memory: (perf.getMemory as () => MemorySnapshot)(),
			list: (perf.getListStats as () => ListSnapshot)(),
			callCount: (perf.getCallCount as () => number)(),
		};
	});
}

test.describe("무한스크롤 성능 측정", () => {
	test.setTimeout(180_000);

	test("스크롤 로드 지연, 렌더 DOM, 메모리, FPS(추정) 항목을 수집한다", async ({
		page,
	}) => {
		await setupPageMonitors(page);
		await HomePage.goToHome(page);

		await expect(page.getByRole("link", { name: "Homepage link" })).toBeVisible(
			{
				timeout: WAIT_TIMEOUT,
			},
		);
		await expect(
			page.getByTestId("blog-main__recently-post-list").getByRole("listitem"),
		).toHaveCount(10);

		const trigger = page.getByTestId("blog-main__scroll-trigger-helper");
		const shouldMeasure = (await trigger.count()) > 0;
		test.skip(
			!shouldMeasure,
			"더 로드할 데이터가 없어 성능 측정이 불가합니다.",
		);

		const targetCycles = Number(
			process.env.BENCH_SCROLL_CYCLES ?? DEFAULT_CYCLES,
		);
		const results: BenchResult[] = [];

		for (let cycle = 1; cycle <= targetCycles; cycle += 1) {
			const triggerExists = (await trigger.count()) > 0;
			if (!triggerExists) {
				break;
			}
			const loadingIndicator = page.getByTestId(
				"blog-post__front-matter-loading",
			);

			const beforeState = await getCurrentPerfState(page);
			const beforeMaxIndex = beforeState.list.maxRenderedIndex;
			const beforeRenderedCount = beforeState.list.renderedListItems;
			const beforeMountedCount = beforeState.list.mountedListItems;
			const beforeCallCount = beforeState.callCount;
			const startedAt = await page.evaluate(() => performance.now());
			const rangeResponsePromise = page
				.waitForResponse(
					(response) => {
						return (
							response.request().method() === "GET" &&
							response.url().includes("/posts/latest/range")
						);
					},
					{ timeout: LOAD_WAIT_TIMEOUT },
				)
				.then(
					(response) =>
						response.json() as Promise<{
							totalCount?: number;
							frontmatters?: unknown[];
						} | null>,
				)
				.catch(() => null);

			await page.evaluate(() => {
				const perf = (window as unknown as ScrollPerfWindow).__scrollPerf;
				perf.clearFrameSamples();
				perf.startFrameSampling();
			});
			await trigger.scrollIntoViewIfNeeded();

			const hasProgress = await page
				.waitForFunction(
					(args) => {
						const perf = (window as unknown as ScrollPerfWindow).__scrollPerf;
						const nowList = (perf.getListStats as () => ListSnapshot)();
						const nowCallCount = (perf.getCallCount as () => number)();
						const hasCall = nowCallCount > args.callCount;
						const hasAddedListItem = nowList.renderedListItems > args.rendered;
						const hasExpandedWindow =
							nowList.maxRenderedIndex > args.maxRenderedIndex;
						const hasMountedGrowth = nowList.mountedListItems > args.mounted;
						const hasLoadingState = nowList.hasLoading;
						return (
							hasCall ||
							hasAddedListItem ||
							hasExpandedWindow ||
							hasMountedGrowth ||
							(hasLoadingState && !args.beforeLoading)
						);
					},
					{
						callCount: beforeCallCount,
						rendered: beforeRenderedCount,
						maxRenderedIndex: beforeMaxIndex,
						mounted: beforeMountedCount,
						beforeLoading: beforeState.list.hasLoading,
					},
					{ timeout: LOAD_WAIT_TIMEOUT },
				)
				.catch(() => false);

			if (!hasProgress) {
				await stopScrollPerfSampling(page);
				console.warn(
					`사이클 ${cycle}: 추가 포스트 로딩 이벤트를 감지하지 못했습니다.`,
				);
				break;
			}

			if (await loadingIndicator.isVisible().catch(() => false)) {
				await loadingIndicator
					.waitFor({ state: "hidden", timeout: LOAD_WAIT_TIMEOUT })
					.catch(() => {
						console.warn(
							`사이클 ${cycle}: 로딩 인디케이터가 사라지지 않아 타임아웃으로 측정 종료.`,
						);
					});
			} else {
				await page
					.waitForFunction(
						(args) => {
							const perf = (window as unknown as ScrollPerfWindow).__scrollPerf;
							const nowList = (perf.getListStats as () => ListSnapshot)();
							return (
								nowList.renderedListItems > args.rendered ||
								nowList.maxRenderedIndex > args.maxRenderedIndex ||
								nowList.mountedListItems > args.mounted
							);
						},
						{
							rendered: beforeRenderedCount,
							maxRenderedIndex: beforeMaxIndex,
							mounted: beforeMountedCount,
						},
						{ timeout: LOAD_WAIT_TIMEOUT },
					)
					.catch(() => {
						console.warn(
							`사이클 ${cycle}: 렌더 반영이 미완료되어 이후 계산을 보수적으로 진행합니다.`,
						);
					});
			}

			const endedAt = await page.evaluate(() => performance.now());
			await page.waitForTimeout(250);

			const [afterState, frameSamples, lastCall, rangePayload] =
				await Promise.all([
					getCurrentPerfState(page),
					page.evaluate(
						() =>
							(
								window as unknown as ScrollPerfWindow
							).__scrollPerf.getFrameSnapshot() as FrameSnapshot,
					),
					page
						.evaluate(
							() =>
								(
									window as unknown as ScrollPerfWindow
								).__scrollPerf.getLastCall() as FetchMeta | null,
						)
						.catch(() => null),
					rangeResponsePromise,
				]);

			const mergedLastCall: FetchMeta | null = lastCall
				? {
						...lastCall,
						totalCount: rangePayload?.totalCount ?? lastCall.totalCount,
						receivedItems:
							Array.isArray(rangePayload?.frontmatters) && rangePayload
								? rangePayload.frontmatters.length
								: lastCall.receivedItems,
					}
				: null;

			await stopScrollPerfSampling(page);

			const frameStats = calcFrameStats(frameSamples.samples);
			const heapAfterUsed = roundBytesToMB(afterState.memory.usedMB);
			const heapBeforeUsed = roundBytesToMB(beforeState.memory.usedMB);

			const result: BenchResult = {
				cycle,
				fetchDurationMs: roundTo2(
					mergedLastCall?.durationMs ??
						(typeof endedAt === "number" && typeof startedAt === "number"
							? endedAt - startedAt
							: null),
				),
				receivedItems: mergedLastCall?.receivedItems ?? 0,
				totalCount: mergedLastCall?.totalCount ?? null,
				renderedListItems: afterState.list.renderedListItems,
				mountedListItems: afterState.list.mountedListItems,
				heapMB: {
					before: {
						usedMB: roundBytesToMB(beforeState.memory.usedMB),
						totalMB: roundBytesToMB(beforeState.memory.totalMB),
						heapLimitMB: roundBytesToMB(beforeState.memory.heapLimitMB),
					},
					after: {
						usedMB: roundBytesToMB(afterState.memory.usedMB),
						totalMB: roundBytesToMB(afterState.memory.totalMB),
						heapLimitMB: roundBytesToMB(afterState.memory.heapLimitMB),
					},
					deltaMB: Number(
						(Number(heapAfterUsed ?? 0) - Number(heapBeforeUsed ?? 0)).toFixed(
							2,
						),
					),
				},
				framesPerWindow: frameStats,
			};

			results.push(result);

			if (
				beforeState.list.renderedListItems >=
					(result.totalCount ?? Number.MAX_SAFE_INTEGER) ||
				afterState.list.renderedListItems <= beforeState.list.renderedListItems
			) {
				break;
			}
		}

		console.log("\n===== Infinite Scroll Performance Metrics =====");
		console.log(`총 측정 사이클: ${results.length}`);
		for (const result of results) {
			const loadedCount =
				result.fetchDurationMs === null ? "-" : `${result.fetchDurationMs} ms`;
			const delta =
				result.heapMB.deltaMB === null ? "-" : `${result.heapMB.deltaMB} MB`;
			console.log(
				`- cycle=${result.cycle}, fetch=${loadedCount}, received=${result.receivedItems}, ` +
					`renderedLi=${result.renderedListItems}, mountedLi=${result.mountedListItems}, ` +
					`heapDelta=${delta}, fpsWindowAvg=${result.framesPerWindow.avgFrameMs}ms, p95=${result.framesPerWindow.p95FrameMs}ms`,
			);
		}
	});
});
