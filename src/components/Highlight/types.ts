import { Interpolation, Theme } from '@emotion/react';

export type Chunk = {
  text: string;
  match: boolean;
};

export type HighlightOptions = {
  text: string;
  query: string | string[];
};

export type HighlightProps = {
  query: string | string[];
  children: string | ((props: Chunk[]) => React.ReactNode);
  highlightCss?: Interpolation<Theme>;
};

export type UseHighlightProps = HighlightOptions;
