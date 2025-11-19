import { memo, useEffect, useRef } from "react";
import { useBlogPostContext } from "../BlogPostProvider";

export const BlogPostListViewTrigger = memo(function BlogPostListViewTrigger() {
  const { loadMore, hasMore } = useBlogPostContext();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerTarget.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { 
        threshold: 0.5,
        rootMargin: '100px',
      }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  if (!hasMore) {
    return null;
  }

  return (
    <div 
      data-testid={'blog-main__scroll-trigger-helper'}
      ref={observerTarget} 
      style={{ height: '1px', width: '100%' }} 
      aria-hidden="true"
    />
  );
});