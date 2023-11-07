import { Interpolation, Theme } from '@emotion/react';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import * as styles from './styles';

interface IconSvg {
  type: 'svg';
  src: ReactNode;
}

interface IconImage {
  type: 'img';
  src: string;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  isReactRouter: boolean;
  icon: IconSvg | IconImage;
}

export interface NavigationProps<T extends NavItem> {
  /** Mảng data đầu vào
   @example
   [{
      id: 1,
      label: 'Home',
      href: '/home',
      isReactRouter: true,
      icon: {
        type: 'img',
        src: 'https://.....jpeg'
      }
    }]
   */
  data: T[];
  /** Menu hiển thị dọc | ngang */
  type?: 'vertical' | 'horizontal';
  /** custom container css */
  containerCss?: Interpolation<Theme>;
}

export const Navigation = <T extends NavItem>({ containerCss, data, type = 'vertical' }: NavigationProps<T>) => {
  const renderMenuItem = (item: T): ReactNode => {
    const { href, id, isReactRouter, label, icon } = item;

    const Icon = icon.type === 'img' ? <img src={icon.src} alt={label} /> : icon.src;
    if (isReactRouter) {
      return (
        <NavLink key={id} to={href}>
          {Icon}
          {label}
        </NavLink>
      );
    }

    return (
      <a key={id} href={href} target="_blank" rel="noreferrer">
        {Icon}
        {label}
      </a>
    );
  };

  return <div css={[containerCss, styles.container(type)]}>{data.map(renderMenuItem)}</div>;
};
