import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE_DIR = process.cwd();
const METRICS_DIR = path.resolve(
	BASE_DIR,
	process.argv[2] ?? "test-results/blog-scroll-metrics",
);
const BASELINE_SUMMARY_PATH = process.env.BLOG_SCROLL_METRIC_BASELINE_SUMMARY;
const MIN_SAMPLE_SIZE = Number(process.env.BLOG_SCROLL_MIN_SAMPLE_SIZE ?? "10");

const outputDir = path.resolve(BASE_DIR, "test-results");

function percentile(sortedValues, ratio) {
	if (sortedValues.length === 0) return 0;
	const sorted = [...sortedValues].sort((a, b) => a - b);
	const idx = Math.min(
		sorted.length - 1,
		Math.floor((sorted.length - 1) * ratio),
	);
	return sorted[idx];
}

function safeMean(values) {
	if (values.length === 0) {
		return 0;
	}
	const total = values.reduce((acc, value) => acc + value, 0);
	return Number((total / values.length).toFixed(2));
}

function safeStdDev(values) {
	if (values.length <= 1) {
		return 0;
	}
	const mean = safeMean(values);
	const variance =
		values.reduce((acc, value) => {
			return acc + (value - mean) ** 2;
		}) /
		(values.length - 1);
	return Number(Math.sqrt(variance).toFixed(2));
}

function percentChange(current, previous) {
	if (
		!Number.isFinite(current) ||
		!Number.isFinite(previous) ||
		previous === 0
	) {
		return 0;
	}
	return Number(((current - previous) / previous).toFixed(4));
}

function addCount(target, key, value = 1) {
	target[key] = (target[key] ?? 0) + value;
}

function ensureBucket(name) {
	return {
		label: name,
		count: 0,
		profileCounts: {},
		reachedTargetCount: 0,
		stopCauseCounts: {},
		attempts: [],
		elapsedMs: [],
		initialListItemCounts: [],
		finalListItemCounts: [],
		targetCounts: [],
		noProgressAttempts: [],
		rangeRequestCounts: [],
		terminalExtraRangeRequests: [],
		terminalRequestCountsAtTerminal: [],
		rangeRequestFailures: [],
		loadMoreReactionP50: [],
		loadMoreReactionP95: [],
		loadMoreReactionP99: [],
		loadMoreReactionMax: [],
		rangeRequestDurationP50: [],
		rangeRequestDurationP95: [],
		rangeRequestDurationMax: [],
		rangeRequestFirstLatency: [],
		rangeRequestLastLatency: [],
		rangeRequestInterArrivalP95: [],
		rangeRequestStatusCounts: {},
		noProgressAttemptCounts: [],
		firstProgressAttempts: [],
		maxScrollTopPx: [],
		totalScrollDeltaPx: [],
		maxScrollAttempts: [],
		deltaItemCounts: [],
		terminalProbeProgressed: [],
		terminalProbeAttempts: [],
		terminalProbeRequestDelta: [],
		reasonDistribution: {
			remainingPx: 0,
			remainingItems: 0,
			both: 0,
			unknown: 0,
		},
		loadMoreInvokedWithoutMore: [],
		loadMoreInvokedWhilePending: [],
		invocationCount: [],
		updateCount: [],
	};
}

function addRecord(metric, record) {
	metric.count += 1;
	const reachedTarget = record.reachedTarget === true;
	if (reachedTarget) {
		metric.reachedTargetCount += 1;
	}

	const stopCause = record.stopCause ?? "attempt-limit";
	metric.stopCauseCounts[stopCause] =
		(metric.stopCauseCounts[stopCause] ?? 0) + 1;

	const attempts = Number(record.attempts ?? 0);
	const elapsedMs = Number(record.elapsedMs ?? 0);
	const initialListItemCount = Number(record.initialListItemCount ?? 0);
	const finalListItemCount = Number(
		record.finalListItemCount ?? record.listItemCount ?? 0,
	);
	const targetCount = Number(record.targetCount ?? 0);
	const noProgressAttempts = Number(record.noProgressAttempts ?? 0);
	const rangeRequestCount = Number(record.rangeRequestCount ?? 0);
	const terminalExtraRangeRequestCount = Number(
		record.terminalExtraRangeRequestCount ?? 0,
	);
	const terminalRequestCountAtTerminal = Number(
		record.terminalRequestCountAtTerminal ?? 0,
	);
	const requestFailureCount = Number(record.rangeRequestFailureCount ?? 0);
	const invocationCount = Number(record.loadMoreInvokedCount ?? 0);
	const updateCount = Number(record.rangeUpdateCount ?? 0);
	const terminalProbeProgressed = record.terminalProbeProgressed;
	const terminalProbeAttempts = Number(record.terminalProbeAttempts ?? 0);
	const terminalProbeRequestDelta = Number(
		record.terminalProbeRequestDelta ?? 0,
	);
	const profile = String(record.profile ?? "jump");
	const maxScrollTopPx = Number(record.maxScrollTopPx ?? 0);
	const totalScrollDeltaPx = Number(record.totalScrollDeltaPx ?? 0);
	const maxScrollAttempts = Number(record.maxScrollAttempts ?? 0);
	const firstProgressAttempt = Number(record.firstProgressAttempt ?? 0);
	const rangeRequestFirstLatency = Number(
		record.rangeRequestFirstLatencyMs ?? 0,
	);
	const rangeRequestLastLatency = Number(record.rangeRequestLastLatencyMs ?? 0);
	const rangeRequestInterArrivalP95 = Number(
		record.rangeRequestInterArrivalP95Ms ?? 0,
	);

	metric.attempts.push(attempts);
	metric.elapsedMs.push(elapsedMs);
	metric.initialListItemCounts.push(initialListItemCount);
	metric.finalListItemCounts.push(finalListItemCount);
	metric.targetCounts.push(targetCount);
	metric.noProgressAttempts.push(noProgressAttempts);
	metric.rangeRequestCounts.push(rangeRequestCount);
	metric.invocationCount.push(invocationCount);
	metric.updateCount.push(updateCount);
	metric.terminalExtraRangeRequests.push(terminalExtraRangeRequestCount);
	metric.terminalRequestCountsAtTerminal.push(terminalRequestCountAtTerminal);
	metric.rangeRequestFailures.push(requestFailureCount);
	metric.profileCounts[profile] = (metric.profileCounts[profile] ?? 0) + 1;
	metric.maxScrollTopPx.push(maxScrollTopPx);
	metric.totalScrollDeltaPx.push(totalScrollDeltaPx);
	metric.maxScrollAttempts.push(maxScrollAttempts);
	metric.noProgressAttemptCounts.push(noProgressAttempts);
	metric.firstProgressAttempts.push(firstProgressAttempt);
	metric.deltaItemCounts.push(finalListItemCount - initialListItemCount);
	metric.terminalProbeProgressed.push(terminalProbeProgressed ? 1 : 0);
	metric.terminalProbeAttempts.push(terminalProbeAttempts);
	metric.terminalProbeRequestDelta.push(terminalProbeRequestDelta);
	metric.rangeRequestFirstLatency.push(rangeRequestFirstLatency);
	metric.rangeRequestLastLatency.push(rangeRequestLastLatency);
	metric.rangeRequestInterArrivalP95.push(rangeRequestInterArrivalP95);

	const statusCounts = record.rangeRequestStatusCounts;
	if (statusCounts && typeof statusCounts === "object") {
		for (const [key, value] of Object.entries(statusCounts)) {
			const num = Number(value);
			if (Number.isFinite(num)) {
				addCount(metric.rangeRequestStatusCounts, key, num);
			}
		}
	}

	const reasonDistribution = record.loadMoreReasonDistribution;
	if (reasonDistribution && typeof reasonDistribution === "object") {
		metric.reasonDistribution.remainingPx += Number(
			reasonDistribution.remainingPx ?? 0,
		);
		metric.reasonDistribution.remainingItems += Number(
			reasonDistribution.remainingItems ?? 0,
		);
		metric.reasonDistribution.both += Number(reasonDistribution.both ?? 0);
		metric.reasonDistribution.unknown += Number(
			reasonDistribution.unknown ?? 0,
		);
	}

	metric.loadMoreInvokedWithoutMore.push(
		Number(record.loadMoreInvokedWithoutMoreCount ?? 0),
	);
	metric.loadMoreInvokedWhilePending.push(
		Number(record.loadMoreInvokedWhilePendingCount ?? 0),
	);

	const reactionP50 = Number(record.loadMoreReactionMsP50 ?? 0);
	const reactionP95 = Number(record.loadMoreReactionMsP95 ?? 0);
	const reactionP99 = Number(record.loadMoreReactionMsP99 ?? 0);
	const reactionMax = Number(record.loadMoreReactionMsMax ?? 0);
	const durationP50 = Number(record.rangeRequestDurationP50 ?? 0);
	const durationP95 = Number(record.rangeRequestDurationP95 ?? 0);
	const durationMax = Number(record.rangeRequestDurationMax ?? 0);

	if (Number.isFinite(reactionP50) && reactionP50 >= 0) {
		metric.loadMoreReactionP50.push(reactionP50);
	}
	if (Number.isFinite(reactionP95) && reactionP95 >= 0) {
		metric.loadMoreReactionP95.push(reactionP95);
	}
	if (Number.isFinite(reactionP99) && reactionP99 >= 0) {
		metric.loadMoreReactionP99.push(reactionP99);
	}
	if (Number.isFinite(reactionMax) && reactionMax >= 0) {
		metric.loadMoreReactionMax.push(reactionMax);
	}
	if (Number.isFinite(durationP50) && durationP50 >= 0) {
		metric.rangeRequestDurationP50.push(durationP50);
	}
	if (Number.isFinite(durationP95) && durationP95 >= 0) {
		metric.rangeRequestDurationP95.push(durationP95);
	}
	if (Number.isFinite(durationMax) && durationMax >= 0) {
		metric.rangeRequestDurationMax.push(durationMax);
	}
}

function buildSummaryEntry(metric) {
	const terminalExtraSorted = [...metric.terminalExtraRangeRequests];
	const terminalAttempts = metric.terminalExtraRangeRequests.filter(
		(count) => count > 0,
	);
	const totalRangeRequestCount = metric.rangeRequestCounts.reduce(
		(acc, value) => acc + value,
		0,
	);
	const totalLoadMoreInvokedCount = metric.invocationCount.reduce(
		(acc, value) => acc + value,
		0,
	);
	const totalLoadMoreWithoutMore = metric.loadMoreInvokedWithoutMore.reduce(
		(acc, value) => acc + value,
		0,
	);
	const totalLoadMoreWhilePending = metric.loadMoreInvokedWhilePending.reduce(
		(acc, value) => acc + value,
		0,
	);
	const totalRangeFailureCount = metric.rangeRequestFailures.reduce(
		(acc, value) => acc + value,
		0,
	);

	return {
		scenario: metric.label,
		count: metric.count,
		profiles: metric.profileCounts,
		meanDeltaItemCount: safeMean(metric.deltaItemCounts),
		p95DeltaItemCount: percentile(metric.deltaItemCounts, 0.95),
		deltaItemCountStdDev: safeStdDev(metric.deltaItemCounts),
		reachedTargetCount: metric.reachedTargetCount,
		reachedTargetRatePercent: Number(
			metric.count === 0
				? 0
				: Number(((metric.reachedTargetCount / metric.count) * 100).toFixed(2)),
		),
		noProgressRatePercent: Number(
			metric.count === 0
				? 0
				: Number(
						((metric.stopCauseCounts["no-progress"] ?? 0) / metric.count) * 100,
					).toFixed(2),
		),
		attemptLimitRatePercent: Number(
			metric.count === 0
				? 0
				: Number(
						((metric.stopCauseCounts["attempt-limit"] ?? 0) / metric.count) *
							100,
					).toFixed(2),
		),
		avgAttempts: safeMean(metric.attempts),
		p95Attempts: percentile(metric.attempts, 0.95),
		attemptsStdDev: safeStdDev(metric.attempts),
		avgElapsedMs: safeMean(metric.elapsedMs),
		avgRangeRequestCount: safeMean(metric.rangeRequestCounts),
		rangeRequestCountStdDev: safeStdDev(metric.rangeRequestCounts),
		totalRangeRequestCount,
		rangeRequestCountP95: percentile(metric.rangeRequestCounts, 0.95),
		avgFinalListItemCount: safeMean(metric.finalListItemCounts),
		avgDeltaItemCount: safeMean(
			metric.finalListItemCounts.map(
				(finalCount, index) =>
					finalCount - (metric.initialListItemCounts[index] ?? 0),
			),
		),
		terminalExtraRangeRequestRatePercent:
			metric.terminalExtraRangeRequests.length === 0
				? null
				: Number(
						(
							(metric.terminalExtraRangeRequests.filter((count) => count === 0)
								.length /
								metric.terminalExtraRangeRequests.length) *
							100
						).toFixed(2),
					),
		terminalExtraRangeRequestAvg: safeMean(terminalExtraSorted),
		terminalExtraRangeRequestP95: percentile(terminalExtraSorted, 0.95),
		terminalRequestCountAtTerminalAvg: safeMean(
			metric.terminalRequestCountsAtTerminal,
		),
		stopCauseCounts: metric.stopCauseCounts,
		avgMaxScrollTopPx: safeMean(metric.maxScrollTopPx),
		avgTotalScrollDeltaPx: safeMean(metric.totalScrollDeltaPx),
		avgMaxScrollAttempts: safeMean(metric.maxScrollAttempts),
		avgFirstProgressAttempt: safeMean(
			metric.firstProgressAttempts.filter((value) => value > 0),
		),
		avgNoProgressAttempts: safeMean(metric.noProgressAttemptCounts),
		rangeRequestFirstLatencyP95: percentile(
			metric.rangeRequestFirstLatency,
			0.95,
		),
		rangeRequestLastLatencyP95: percentile(
			metric.rangeRequestLastLatency,
			0.95,
		),
		rangeRequestInterArrivalP95: percentile(
			metric.rangeRequestInterArrivalP95,
			0.95,
		),
		terminalProbeProgressRatePercent:
			metric.terminalProbeProgressed.length === 0
				? 0
				: Number(
						(
							(metric.terminalProbeProgressed.reduce(
								(acc, value) => acc + value,
								0,
							) /
								metric.terminalProbeProgressed.length) *
							100
						).toFixed(2),
					),
		terminalProbeAttemptsMean: safeMean(metric.terminalProbeAttempts),
		terminalProbeRequestDeltaMean: safeMean(metric.terminalProbeRequestDelta),
		terminalProbeRequestDeltaP95: percentile(
			metric.terminalProbeRequestDelta,
			0.95,
		),
		rangeRequestFailureRatePercent: Number(
			totalRangeRequestCount === 0
				? 0
				: (
						(totalRangeFailureCount /
							(totalRangeRequestCount + Number.EPSILON)) *
						100
					).toFixed(2),
		),
		loadMoreInvokedWithoutMoreRatePercent: Number(
			totalLoadMoreInvokedCount === 0
				? 0
				: (
						(totalLoadMoreWithoutMore /
							(totalLoadMoreInvokedCount + Number.EPSILON)) *
						100
					).toFixed(2),
		),
		loadMoreInvokedWhilePendingRatePercent: Number(
			totalLoadMoreInvokedCount === 0
				? 0
				: (
						(totalLoadMoreWhilePending /
							(totalLoadMoreInvokedCount + Number.EPSILON)) *
						100
					).toFixed(2),
		),
		loadMoreReasonDistribution: metric.reasonDistribution,
		rangeRequestStatusCounts: metric.rangeRequestStatusCounts,
		rangeRequestDurationP95: percentile(metric.rangeRequestDurationP95, 0.95),
		loadMoreReactionP95: percentile(metric.loadMoreReactionP95, 0.95),
		loadMoreReactionP50: percentile(metric.loadMoreReactionP50, 0.5),
		loadMoreReactionP99: percentile(metric.loadMoreReactionP99, 0.99),
		loadMoreReactionMax: metric.loadMoreReactionMax.length
			? Math.max(...metric.loadMoreReactionMax)
			: 0,
		loadMoreInvokedWithoutMore: safeMean(metric.loadMoreInvokedWithoutMore),
		loadMoreInvokedWhilePending: safeMean(metric.loadMoreInvokedWhilePending),
		avgLoadMoreInvocationCount: safeMean(metric.invocationCount),
		avgRangeUpdateCount: safeMean(metric.updateCount),
		terminalExtraRangeRequestOutliers: terminalAttempts.length,
	};
}

function findBaselineSummary(rawSummary) {
	if (!rawSummary || typeof rawSummary !== "object") {
		return null;
	}

	if (rawSummary.summary && typeof rawSummary.summary === "object") {
		return rawSummary.summary;
	}

	if (
		rawSummary.byScenario &&
		rawSummary.byProject &&
		rawSummary.totalRuns !== undefined
	) {
		return rawSummary;
	}

	return null;
}

function buildMetricComparisonEntry(current, baseline) {
	if (current === undefined || baseline === undefined) {
		return null;
	}

	const keys = [
		"reachedTargetRatePercent",
		"avgRangeRequestCount",
		"avgElapsedMs",
		"terminalProbeProgressRatePercent",
		"terminalProbeRequestDeltaP95",
		"terminalProbeAttemptsMean",
		"p95Attempts",
		"attemptLimitRatePercent",
		"noProgressRatePercent",
		"loadMoreReactionP95",
		"loadMoreReactionP99",
		"rangeRequestFirstLatencyP95",
		"rangeRequestCountP95",
		"loadMoreInvokedWhilePendingRatePercent",
	];

	const deltas = {};
	for (const key of keys) {
		const currentValue = Number(current[key] ?? 0);
		const baselineValue = Number(baseline[key] ?? 0);
		if (Number.isFinite(currentValue) && Number.isFinite(baselineValue)) {
			deltas[key] = {
				current: currentValue,
				baseline: baselineValue,
				delta: Number((currentValue - baselineValue).toFixed(4)),
				deltaRate: percentChange(currentValue, baselineValue),
			};
		}
	}
	return deltas;
}

async function loadBaselineSummary() {
	if (!BASELINE_SUMMARY_PATH) {
		return null;
	}

	const baselinePath = path.resolve(BASE_DIR, BASELINE_SUMMARY_PATH);
	try {
		const raw = await readFile(baselinePath, "utf8");
		const parsed = JSON.parse(raw);
		return findBaselineSummary(parsed);
	} catch (error) {
		console.warn(
			`[blog-scroll-metrics] skip baseline comparison: ${baselinePath}: ${error}`,
		);
		return null;
	}
}

const files = await readdir(METRICS_DIR).catch(() => []);
if (files.length === 0) {
	console.log(`[blog-scroll-metrics] no metrics in ${METRICS_DIR}`);
	process.exit(0);
}

const records = [];
for (const file of files) {
	if (!file.endsWith(".json")) continue;
	try {
		const fullPath = path.join(METRICS_DIR, file);
		const raw = await readFile(fullPath, "utf8");
		records.push(JSON.parse(raw));
	} catch (error) {
		console.warn(`[blog-scroll-metrics] skip invalid file ${file}: ${error}`);
	}
}

if (records.length === 0) {
	console.log(`[blog-scroll-metrics] no valid metric json in ${METRICS_DIR}`);
	process.exit(0);
}

const byScenario = new Map();
const byProject = new Map();
const byProfile = new Map();
const byTarget = new Map();
const allRangeRequests = [];
const allLoadMoreReactionMs = [];
const allRangeRequestCounts = [];

for (const record of records) {
	const scenario = record.scenario ?? "unknown";
	const project = record.project ?? "unknown";
	const profile = String(record.profile ?? "jump");
	const targetKey = String(record.targetCount ?? "unknown");

	const scenarioStats = byScenario.get(scenario) ?? ensureBucket(scenario);
	const projectStats = byProject.get(project) ?? ensureBucket(project);
	const profileStats = byProfile.get(profile) ?? ensureBucket(profile);
	const targetStats = byTarget.get(targetKey) ?? ensureBucket(targetKey);

	addRecord(scenarioStats, record);
	addRecord(projectStats, record);
	addRecord(profileStats, record);
	addRecord(targetStats, record);
	byScenario.set(scenario, scenarioStats);
	byProject.set(project, projectStats);
	byProfile.set(profile, profileStats);
	byTarget.set(targetKey, targetStats);

	if (Array.isArray(record.rangeRequests)) {
		for (const request of record.rangeRequests) {
			const durationMs = Number(request.durationMs ?? 0);
			if (Number.isFinite(durationMs) && durationMs >= 0) {
				allRangeRequests.push(durationMs);
			}
		}
	}

	const runRangeRequestCount = Number(record.rangeRequestCount ?? 0);
	if (Number.isFinite(runRangeRequestCount) && runRangeRequestCount >= 0) {
		allRangeRequestCounts.push(runRangeRequestCount);
	}

	if (Array.isArray(record.rangeEvents)) {
		for (const event of record.rangeEvents) {
			if (event?.type === "load_more_invoked") {
				const ms = Number(event.loadMoreReactionMs ?? 0);
				if (Number.isFinite(ms) && ms >= 0) {
					allLoadMoreReactionMs.push(ms);
				}
			}
		}
	}
}

const scenarioSummary = Array.from(byScenario.values()).map(buildSummaryEntry);
const projectSummary = Array.from(byProject.values()).map(buildSummaryEntry);
const profileSummary = Array.from(byProfile.values()).map(buildSummaryEntry);
const targetSummary = Array.from(byTarget.values())
	.map((metric) => ({
		targetCount: metric.label,
		...buildSummaryEntry(metric),
	}))
	.sort((a, b) => {
		const aCount = Number(a.targetCount);
		const bCount = Number(b.targetCount);
		if (Number.isFinite(aCount) && Number.isFinite(bCount)) {
			return aCount - bCount;
		}
		return String(a.targetCount).localeCompare(String(b.targetCount));
	});

const baselineSummary = await loadBaselineSummary();
const baselineScenarioByLabel = new Map(
	(baselineSummary?.byScenario ?? []).map((entry) => [entry.scenario, entry]),
);
const baselineComparisonByScenario = scenarioSummary.map((entry) => ({
	scenario: entry.scenario,
	countDelta:
		entry.count - (baselineScenarioByLabel.get(entry.scenario)?.count ?? 0),
	metrics: buildMetricComparisonEntry(
		entry,
		baselineScenarioByLabel.get(entry.scenario),
	),
}));

const summary = {
	generatedAt: new Date().toISOString(),
	metricsDir: METRICS_DIR,
	totalRuns: records.length,
	byScenario: scenarioSummary,
	byProject: projectSummary,
	byProfile: profileSummary,
	byTarget: targetSummary,
	baselineComparison: BASELINE_SUMMARY_PATH
		? {
				source: BASELINE_SUMMARY_PATH,
				loaded: baselineSummary !== null,
				scenario: baselineComparisonByScenario,
			}
		: null,
	sampling: {
		minRecommendedPerScenario: Number.isFinite(MIN_SAMPLE_SIZE)
			? MIN_SAMPLE_SIZE
			: 10,
		underSampledScenarios: Array.from(byScenario.entries())
			.map(([label, metric]) => ({ label, count: metric.count }))
			.filter(
				({ count }) =>
					count < (Number.isFinite(MIN_SAMPLE_SIZE) ? MIN_SAMPLE_SIZE : 0),
			),
	},
	loadMoreReactionMsP95: percentile(allLoadMoreReactionMs, 0.95),
	totalRangeRequestDurationMsSum: allRangeRequests.reduce(
		(acc, value) => acc + value,
		0,
	),
	avgRangeRequestDurationMs:
		allRangeRequests.length === 0
			? 0
			: Number(
					(
						allRangeRequests.reduce((acc, value) => acc + value, 0) /
						allRangeRequests.length
					).toFixed(2),
				),
	avgRangeRequestsPerRun:
		allRangeRequestCounts.length === 0
			? 0
			: Number(
					(
						allRangeRequestCounts.reduce((acc, value) => acc + value, 0) /
						allRangeRequestCounts.length
					).toFixed(2),
				),
	terminalRunsWithoutExtraLoadMore: byScenario
		.entries()
		.filter(([label]) =>
			String(label).startsWith("infinite-scroll-no-extra-request-at-terminal"),
		)
		.reduce(
			(acc, [, metric]) =>
				acc +
				metric.terminalExtraRangeRequests.filter((count) => count === 0).length,
			0,
		),
};

await mkdir(outputDir, { recursive: true });
const outputPath = path.join(outputDir, "blog-scroll-metrics-summary.json");
await writeFile(
	outputPath,
	JSON.stringify({ summary, records }, null, 2),
	"utf8",
);

console.log(`[blog-scroll-metrics] summary`);
console.log(JSON.stringify(summary, null, 2));
console.log(`[blog-scroll-metrics] saved: ${outputPath}`);
