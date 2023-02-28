import { RefObject, useState } from 'react';

import { useEventListener } from './useEventListener';

export const useHover = <T extends HTMLElement = HTMLElement>(elementRef: RefObject<T>) => {
  const [state, setState] = useState(false);

  const handleMouseEnter = () => setState(true);
  const handleMouseLeave = () => setState(false);

  useEventListener('mouseenter', handleMouseEnter, elementRef);
  useEventListener('mouseleave', handleMouseLeave, elementRef);

  return state;
};
