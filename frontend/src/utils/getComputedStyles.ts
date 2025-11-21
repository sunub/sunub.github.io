/**
 * CSS 변수를 사용한 동적 스타일 계산 유틸리티
 * 런타임 성능 최적화를 위해 CSS-in-JS 대신 CSS 변수 활용
 */

type StyleValue = string | number | undefined;
type StyleRecord = Record<string, StyleValue>;

/**
 * 동적 props를 CSS 변수로 변환
 *
 * @example
 * const style = getComputedStyles({
 *   opacity: 0.5,
 *   url: '/assets/image.jpg',
 *   scale: 1.2
 * });
 * // 결과: { '--opacity': '0.5', '--url': '/assets/image.jpg', '--scale': '1.2' }
 */
export function getComputedStyles(styles: StyleRecord): React.CSSProperties {
	const cssVariables: Record<string, string> = {};

	for (const [key, value] of Object.entries(styles)) {
		if (value !== undefined && value !== null) {
			cssVariables[`--${kebabCase(key)}`] = String(value);
		}
	}

	return cssVariables as React.CSSProperties;
}

/**
 * 조건부 스타일 계산
 *
 * @example
 * const style = getConditionalStyles({
 *   isOpen: true,
 *   isDark: false
 * }, {
 *   isOpen: { transform: 'translateX(0)', opacity: 1 },
 *   isDark: { background: '#000' }
 * });
 */
export function getConditionalStyles<T extends Record<string, boolean>>(
	conditions: T,
	styleMap: Partial<Record<keyof T, StyleRecord>>,
): React.CSSProperties {
	const computedStyles: StyleRecord = {};

	for (const [condition, isActive] of Object.entries(conditions)) {
		if (isActive && styleMap[condition as keyof T]) {
			Object.assign(computedStyles, styleMap[condition as keyof T]);
		}
	}

	return getComputedStyles(computedStyles);
}

/**
 * 테마 기반 스타일 계산
 *
 * @example
 * const style = getThemeStyles('dark', {
 *   light: { iconFill: '#000', scale: 1 },
 *   dark: { iconFill: '#fff', scale: 1.75 }
 * });
 */
export function getThemeStyles<T extends string>(
	theme: T,
	themeStyles: Record<T, StyleRecord>,
): React.CSSProperties {
	return getComputedStyles(themeStyles[theme] || {});
}

/**
 * 애니메이션 관련 스타일 최적화
 * will-change 속성을 자동으로 추가
 */
export function getAnimationStyles(
	styles: StyleRecord,
	animatedProperties: string[],
): React.CSSProperties {
	return {
		...getComputedStyles(styles),
		willChange: animatedProperties.join(", "),
	} as React.CSSProperties;
}

/**
 * camelCase를 kebab-case로 변환
 */
function kebabCase(str: string): string {
	return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * 스타일 메모이제이션을 위한 헬퍼
 * 불필요한 재계산 방지
 */
export function memoizeStyles<T extends StyleRecord>(
	computeFn: () => T,
): () => React.CSSProperties {
	let cache: React.CSSProperties = {};
	let lastDeps: string | null = null;

	return () => {
		const currentStyles = computeFn();
		const currentDeps = JSON.stringify(currentStyles);

		if (lastDeps !== currentDeps) {
			cache = getComputedStyles(currentStyles);
			lastDeps = currentDeps;
		}

		return cache;
	};
}
