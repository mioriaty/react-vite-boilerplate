import { ReactNode } from 'react';
import { createPortal as reactCreatePortal } from 'react-dom';

import { createRootElement } from './createRootElement';

export const createPortal = (children: ReactNode, container?: Element | null) => {
  const root = createRootElement('app-portal');
  root.style.position = 'absolute';
  root.style.top = '0';
  root.style.left = '0';
  root.style.zIndex = '999999';
  root.style.width = '100%';
  root.style.height = '100%';
  root.style.overflow = 'hidden';
  root.style.pointerEvents = 'none';
  return reactCreatePortal(<div css={{ pointerEvents: 'auto' }}>{children}</div>, container ?? root);
};
