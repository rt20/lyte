import {AnimatePresence, m} from 'framer-motion';
import {ProgressCircle} from '../progress/progress-circle';
import React, {
  Fragment,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import {opacityAnimation} from '../animation/opacity-animation';
import clsx from 'clsx';

export interface InfiniteScrollSentinelProps {
  onIntersection: () => void;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  marginTop?: string;
  children?: ReactNode;
  renderSentinelAs?: string;
}
export function InfiniteScrollSentinel({
  onIntersection,
  isFetchingNextPage,
  hasNextPage,
  children,
  marginTop = 'mt-24',
  renderSentinelAs = 'span',
}: InfiniteScrollSentinelProps) {
  const sentinelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        onIntersection();
      }
    });
    observer.observe(sentinelEl);
    return () => {
      observer.unobserve(sentinelEl);
    };
  }, [onIntersection, hasNextPage, isFetchingNextPage]);

  // children might already be wrapper in AnimatePresence, nested
  // it will cause issues, so only wrap default loader with it
  const content = children ? (
    isFetchingNextPage ? (
      children
    ) : null
  ) : (
    <AnimatePresence>
      {isFetchingNextPage && (
        <m.div
          className={clsx('flex justify-center w-full', marginTop)}
          {...opacityAnimation}
        >
          <ProgressCircle isIndeterminate aria-label="loading" />
        </m.div>
      )}
    </AnimatePresence>
  );

  const Sentinel = renderSentinelAs as any;
  return (
    <Fragment>
      <Sentinel ref={sentinelRef} aria-hidden />
      {content}
    </Fragment>
  );
}
