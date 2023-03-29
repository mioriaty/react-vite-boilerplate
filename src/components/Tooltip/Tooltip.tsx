import { Portal } from '@app/components/Portal';
import { useMeasure } from '@app/hooks/useMeasure';
import { FC, useState } from 'react';

import * as styles from './styles';
import { TooltipProps } from './types';

export const Tooltip: FC<TooltipProps> = ({ text, children, className, css, placement = 'top', portal, ...rest }) => {
  const [visible, setVisible] = useState(false);

  const { height, left, setMeasure, top, width } = useMeasure();

  if (!portal) {
    return (
      <div {...rest} data-tooltip={text} css={[styles.container, styles.tooltip, styles.placementTooltip(placement), css]} className={className}>
        {children}
      </div>
    );
  }

  const renderTooltip = () => {
    if (!text) {
      return;
    }
    return <div css={[styles.tooltipText, styles.placementTooltipText(placement, top, left, width, height)]}>{text}</div>;
  };

  return (
    <div
      {...rest}
      css={[styles.container, css]}
      onMouseEnter={event => {
        setMeasure(event);
        setVisible(true);
        rest.onMouseEnter?.(event);
      }}
      onMouseLeave={event => {
        setVisible(false);
        rest.onMouseLeave?.(event);
      }}
    >
      <Portal visible={visible}>{renderTooltip()}</Portal>
      {children}
    </div>
  );
};
