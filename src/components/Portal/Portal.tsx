import { createPortalWrapper } from '@app/components/Portal/createPortalWrapper';
import { useOuterClick } from '@app/hooks/useOuterClick';
import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from './types';

const portalWrapperEl = createPortalWrapper();
document.body.append(portalWrapperEl);

export const Portal: FC<PortalProps> = ({ visible, bodyCss, containerCss, onOutsideClick, overlay, children }) => {
  const childRef = useRef<HTMLDivElement>(null);
  useOuterClick(
    childRef.current,
    () => {
      if (visible) {
        onOutsideClick?.();
      }
    },
    [visible],
  );

  const renderContent = (
    <div css={containerCss}>
      {overlay}
      <div ref={childRef} css={bodyCss}>
        {visible && children}
      </div>
    </div>
  );

  return createPortal(renderContent, portalWrapperEl);
};
