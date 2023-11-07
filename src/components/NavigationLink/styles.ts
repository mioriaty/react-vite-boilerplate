import { css } from '@emotion/react';

type Flow = 'vertical' | 'horizontal';

export const container = (type: Flow) => css`
  display: flex;
  width: 100%;
  flex-direction: ${type === 'vertical' ? 'column' : 'row'};
  padding: 10px;
  overflow: hidden;
`;
