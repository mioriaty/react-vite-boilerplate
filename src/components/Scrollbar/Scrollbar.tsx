import { useDelay } from '@app/hooks/useDelay';
import { Interpolation, Theme } from '@emotion/react';
import { FC, MutableRefObject, useEffect, useRef } from 'react';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars';

export interface ScrollBarsProps extends ScrollbarProps {
  innerRef?: MutableRefObject<Scrollbars | null>;
  css?: Interpolation<Theme>;
  scrollTo?: number;
}

export const ScrollBar: FC<ScrollBarsProps> = ({ css, children, hideTracksWhenNotNeeded = true, scrollTo, ...rest }) => {
  const [delayScrollTop, cancelDelayScrollTop] = useDelay();
  const scrollBarsRef = useRef<Scrollbars | null>(null);

  useEffect(() => {
    const handleAsync = async () => {
      if (typeof scrollTo !== 'undefined') {
        await delayScrollTop();
        scrollBarsRef.current?.scrollTop(scrollTo);
      }
    };
    handleAsync();
    return () => {
      cancelDelayScrollTop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTo]);

  return (
    <Scrollbars {...(rest as any)} ref={scrollBarsRef} css={css} hideTracksWhenNotNeeded={hideTracksWhenNotNeeded}>
      {children}
    </Scrollbars>
  );
};
