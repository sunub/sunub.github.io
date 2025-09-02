import throttle from 'lodash.throttle';
import { RefObject, useEffect } from 'react';

export function useScrollAction(
  observeTarget: RefObject<HTMLDivElement | null>,
  loadMorePublishedPost: ReturnType<typeof throttle>
) {
  useEffect(() => {
    if (!observeTarget.current) {
      return;
    }

    function observerCallback(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        loadMorePublishedPost();
      }
    }

    const observer = new IntersectionObserver(observerCallback);
    observer.observe(observeTarget.current);
    return () => {
      observer.disconnect();
      loadMorePublishedPost.cancel();
    };
  }, [observeTarget, loadMorePublishedPost]);
}
