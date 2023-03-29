import { FC, Fragment } from 'react';

import * as styles from './styles';
import { HighlightProps } from './types';
import { useHighlight } from './utils';

export const Highlight: FC<HighlightProps> = ({ children, query, highlightCss }) => {
  if (typeof children !== 'string') {
    throw new Error('The children prop of Highlight must be a string');
  }

  const chunks = useHighlight({ query, text: children });

  return (
    <>
      {chunks.map((chunk, index) => {
        return chunk.match ? (
          <span key={index} css={[styles.highlight, highlightCss]}>
            {chunk.text}
          </span>
        ) : (
          <Fragment key={index}>{chunk.text}</Fragment>
        );
      })}
    </>
  );
};
