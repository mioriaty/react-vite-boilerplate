import { css } from '@emotion/react';
import { FC } from 'react';
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized';

import { VirtualListProps } from './types';

const listStyles = css({
  '&::-webkit-scrollbar': {
    width: '0',
  },
});

const scrollbar = css({
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track-piece': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb:vertical': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
  },
});

export const VirtualList: FC<VirtualListProps> = ({
  rowCount,
  rowHeight,
  rowRender,
  containerClassName,
  containerCss,
  onScroll,
  listRef,
  disabledScrollStyle = true,
}) => {
  const _rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={{ ...style, paddingBottom: 10 }}>
        {rowRender(index)}
      </div>
    );
  };

  if (rowCount === 0) {
    return <div>Empty</div>;
  }

  return (
    <div className={containerClassName} css={[{ height: '100%', flex: 1 }, containerCss]}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <List
              ref={listRef}
              onScroll={onScroll}
              width={width}
              height={height}
              rowHeight={rowHeight}
              rowRenderer={_rowRender}
              rowCount={Math.ceil(rowCount)}
              css={disabledScrollStyle ? listStyles : scrollbar}
            />
          );
        }}
      </AutoSizer>
    </div>
  );
};
