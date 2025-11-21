/**
 * 여러 클래스를 결합시켜주는 간단한 유틸리티 함수입니다.
 * 또한 Tailwind CSS 클래스를 결합시키는 데에도 사용됩니다.
 */
export function getImgSrc(imgId: string) {
	return `/api/resources${imgId}`;
}
