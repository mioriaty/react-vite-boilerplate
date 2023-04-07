import { Interpolation, Theme } from '@emotion/react';
import { ReactNode, useEffect, useState } from 'react';

import * as styles from './styles';

interface TabItem<T extends string> {
  label: string;
  value: T;
}

export interface TabsProps<T extends string> {
  data: TabItem<T>[];
  defaultValue: T;
  value?: T;
  containerCss?: Interpolation<Theme>;
  tabCss?: Interpolation<Theme>;
  tabHide?: boolean;
  highlightIndex?: number;
  ExpandTab?: ReactNode;
  children: ReactNode | ((value: T) => ReactNode);
  tabItemCss?: (active: boolean) => Interpolation<Theme>;
  renderItem?: (tabItem: TabItem<T>, index: number) => ReactNode;
  onChange?: (value: T) => void;
}

export const Tabs = <T extends string>({
  data,
  defaultValue,
  value,
  containerCss,
  tabCss,
  tabItemCss,
  tabHide = false,
  highlightIndex,
  renderItem,
  children,
  ExpandTab,
  onChange,
}: TabsProps<T>) => {
  const [tabActive, setTabActive] = useState<T>(defaultValue);

  useEffect(() => {
    if (value && value !== tabActive) {
      setTabActive(value);
      onChange?.(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, tabActive]);

  const renderDefaultItem = (item: TabItem<T>) => {
    return <div key={item.value}>{item.label}</div>;
  };

  return (
    <div css={containerCss}>
      {!tabHide && (
        <div css={[styles.tab, tabCss]}>
          {data.map((item, index) => {
            return (
              <div
                key={item.value}
                css={[styles.item(tabActive === item.value, index === highlightIndex), tabItemCss?.(tabActive === item.value)]}
                onClick={() => {
                  setTabActive(item.value);
                  onChange?.(item.value);
                }}
              >
                {renderItem ? renderItem(item, index) : renderDefaultItem(item)}
              </div>
            );
          })}
          {ExpandTab}
        </div>
      )}
      {typeof children === 'function' ? children(tabActive) : children}
    </div>
  );
};
