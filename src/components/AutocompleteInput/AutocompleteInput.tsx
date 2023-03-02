import { createPortal } from '@app/utils/functions/createPortal';
import { offset } from '@app/utils/functions/offset';
import { useTheme } from '@emotion/react';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { TextInput } from '../TextInput';
import * as styles from './styles';

interface AutocompleteInputProps {
  data: string[];
  renderSuggestion?: (suggestion: string, index: number) => ReactNode;
  onSelect?: (suggestion: string) => void;
}

export const AutocompleteInput: FC<AutocompleteInputProps> = ({ data, onSelect, renderSuggestion }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const inputField = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const _handleVisible = () => {
    setWidth(inputField.current?.offsetWidth || 0);
    setHeight(inputField.current?.offsetHeight || 0);

    if (inputField.current !== document.activeElement) {
      setVisible(false);
    } else {
      setVisible(true);
      setTop(offset(inputField.current as Element).top);
      setLeft(offset(inputField.current as Element).left);
    }
  };

  useEffect(() => {
    document.addEventListener('click', _handleVisible);
    return () => {
      document.removeEventListener('click', _handleVisible);
    };
  }, []);

  const _handleChange = (value: string) => {
    setInputValue(value);
  };

  const _handleSelect = (suggestion: string) => () => {
    setInputValue(suggestion);
    onSelect?.(suggestion);
  };

  const _renderSuggestItem = (item: string, index: number) => {
    if (renderSuggestion) {
      renderSuggestion(item, index);
    }

    return (
      <div css={{ padding: '10px', cursor: 'pointer', backgroundColor: theme.colors.gray2 }} key={index} onClick={_handleSelect(item)}>
        {item}
      </div>
    );
  };

  const renderSuggestions = () => {
    const _data = inputValue
      ? data.filter(suggest => {
          const result = suggest.toLowerCase().includes(inputValue.toLowerCase());
          return result;
        })
      : data;

    return (
      <div css={[styles.tooltipText, styles.placementTooltipText(top, left, width, height)]}>
        {_data.length === 0 ? 'Empty' : _data.map(_renderSuggestItem)}
      </div>
    );
  };

  return (
    <div>
      <TextInput value={inputValue} onValueChange={_handleChange} innerRef={inputField} />
      {visible && createPortal(renderSuggestions())}
    </div>
  );
};
