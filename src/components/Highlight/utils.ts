import { useMemo } from 'react';

import { Chunk, HighlightOptions, UseHighlightProps } from './types';

/**
 * It takes a string and escapes all the characters that have special meaning in regular expressions
 * @param {string} term - The term to escape.
 */
export const escapeRegexp = (term: string): string => term.replace(/[|\\{}()[\]^$+*?.-]/g, (char: string) => `\\${char}`);

/**
 * nhận vào một mảng các chuỗi, lọc bỏ các chuỗi trống, thực hiện escape các chuỗi còn lại, và nối chúng lại thành một regex duy nhất.
 * @param {string[]} query - The array of strings that we want to search for.
 * @returns A regular expression that matches any of the words in the query array.
 */
export const buildRegex = (query: string[]) => {
  const _query = query.filter(text => text.length !== 0).map(text => escapeRegexp(text.trim()));
  if (!_query.length) {
    return null;
  }
  return new RegExp(`(${_query.join('|')})`, 'ig');
};

/**
 *  lấy một chuỗi và một truy vấn, và trả về một mảng các phần tử, trong đó mỗi phần tử là một đoạn khớp hoặc không khớp.
 * @param {HighlightOptions}  - text - the text to highlight
 * @returns An array of objects with a text property and a match property.
 */
export function highlightWords({ text, query }: HighlightOptions): Chunk[] {
  const regex = buildRegex(Array.isArray(query) ? query : [query]);
  if (!regex) {
    return [{ text, match: false }];
  }
  const result = text.split(regex).filter(Boolean);
  return result.map(str => ({ text: str, match: regex.test(str) }));
}

export function useHighlight(props: UseHighlightProps) {
  const { query, text } = props;
  return useMemo(() => highlightWords({ text, query }), [text, query]);
}
