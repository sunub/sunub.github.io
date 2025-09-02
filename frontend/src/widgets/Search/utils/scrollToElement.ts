export function scrollToElement(element: HTMLElement, container: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const containerStyles = window.getComputedStyle(container);
  const paddingTop = parseFloat(containerStyles.paddingTop);
  const paddingBottom = parseFloat(containerStyles.paddingBottom);

  const visibleTop = containerRect.top + paddingTop;
  const visibleBottom = containerRect.bottom - paddingBottom;

  const isAboveView = elementRect.top < visibleTop;
  const isBelowView = elementRect.bottom > visibleBottom;

  if (isAboveView) {
    const scrollAmount = elementRect.top - visibleTop - 8;
    container.scrollTop += scrollAmount;
  } else if (isBelowView) {
    const scrollAmount = elementRect.bottom - visibleBottom + 8;
    container.scrollTop += scrollAmount;
  }
}
