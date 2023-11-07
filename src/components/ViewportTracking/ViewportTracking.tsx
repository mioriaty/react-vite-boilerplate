import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { checkElementIntersectingViewport } from './checkElementIntersectingViewport';
import createIntersectionObserver from './createIntersectionObserver';
import * as css from './styles';

type ChildrenFn = (inViewport: boolean) => ReactNode;

export interface ViewportTrackingProps {
  /** `onEnterViewport` sẽ hoạt động trước hoặc sau khi chạm top component tuỳ thuộc vào chỉ số `offsetTop`. Mặc định là `0` */
  offsetTop?: number;
  /** `onEnterViewport` sẽ hoạt động trước hoặc sau khi chạm bottom component tuỳ thuộc vào chỉ số `offsetBottom`. Mặc định là `0` */
  offsetBottom?: number;
  /** Số lần component chạy lại và khởi động 2 sự kiện `onEnterViewport` và `onLeaveViewport` */
  numberOfRuns?: number;
  /** Sự kiện được gọi khi component nằm trong màn hình */
  onEnterViewport?: () => void;
  /** Sự kiện được gọi khi component nằm ngoài màn hình */
  onLeaveViewport?: () => void;
  /** Children có thể là ReactNode và cũng có thể là 1 hàm callback có inViewport và return ra ReactNode */
  children: ReactNode | ChildrenFn;
}

export const ViewportTracking: FC<ViewportTrackingProps> = ({
  children,
  offsetTop = 0,
  offsetBottom = 0,
  numberOfRuns = Infinity,
  onEnterViewport,
  onLeaveViewport,
}) => {
  const [inViewport, setInViewport] = useState(false);
  const [enterStart, setEnterStart] = useState(false);
  const [leaveStart, setLeaveStart] = useState(false);
  const [enterCount, setEnterCount] = useState(0);
  const [leaveCount, setLeaveCount] = useState(0);
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (enterStart && enterCount < numberOfRuns) {
      onEnterViewport?.();
      setInViewport(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterStart, enterCount]);

  useEffect(() => {
    if (leaveStart && leaveCount < numberOfRuns) {
      onLeaveViewport?.();
      setInViewport(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveStart, leaveCount]);

  const _handleScroll = useCallback(() => {
    if (viewRef.current) {
      if (checkElementIntersectingViewport(viewRef.current)) {
        setEnterStart(true);
        setEnterCount(enterCount => enterCount + 1);
      } else {
        setLeaveStart(true);
        setLeaveCount(leaveCount => leaveCount + 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intersectionObserver = createIntersectionObserver();
    intersectionObserver.addListener(_handleScroll, viewRef.current);
    return () => intersectionObserver.removeListener(_handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={css.container}>
      {typeof children === 'function' ? (children as ChildrenFn)(inViewport) : children}
      <div ref={viewRef} css={[css.tracking, { top: `${offsetTop}px`, bottom: `${offsetBottom}px` }]} />
    </div>
  );
};
