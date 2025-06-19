import { useEffect, useRef } from "react";

type UseInfiniteScrollOptions = {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

export const useInfiniteScroll = ({ hasMore, isLoading, onLoadMore }: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.5,
      }
    );
    const currentObserver = observerRef.current;

    if (currentObserver) {
      observer.observe(currentObserver);
    }

    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  return observerRef;
};