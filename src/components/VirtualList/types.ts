import { Interpolation, Theme } from '@emotion/react';
import { MutableRefObject, ReactNode } from 'react';
import { List, ScrollParams } from 'react-virtualized';

export interface VirtualListProps {
  listRef?: MutableRefObject<List | null>;
  rowHeight: number;
  rowCount: number;
  containerClassName?: string;
  containerCss?: Interpolation<Theme>;
  disabledScrollStyle?: boolean;
  rowRender: (index: number) => ReactNode;
  onScroll?: (params: ScrollParams) => void;
}
