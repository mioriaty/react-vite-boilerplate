import { isBrowser } from '@app/utils/isBrowser';

export const checkElementIntersectingViewport = (container: Element) => {
  const rect = container.getBoundingClientRect();
  if (!isBrowser) {
    return false;
  }
  return rect.top + rect.height >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight);
};
