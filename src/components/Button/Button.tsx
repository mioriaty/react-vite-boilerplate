import { Interpolation, Theme } from '@emotion/react';
import { ButtonHTMLAttributes, DOMAttributes, FC, forwardRef, ReactNode, Ref } from 'react';

import * as styles from './styles';

export interface ButtonProps {
  block?: boolean;
  size?: Size;
  children: ReactNode;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  loading?: boolean;
  css?: Interpolation<Theme>;
  backgroundColor?: keyof Theme['colors'];
  color?: keyof Theme['colors'];
  onClick?: DOMAttributes<HTMLElement>['onClick'];
}

export const Button: FC<ButtonProps> = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      children,
      block = false,
      css,
      size = 'small',
      href,
      target = '_self',
      type = 'button',
      loading = false,
      disabled = false,
      backgroundColor = 'primary',
      color = 'light',
      onClick,
      ...rest
    },
    ref,
  ) => {
    const props = {
      ...rest,
      css: [styles.container({ size, backgroundColor, color }), styles.block(block), styles.disabled(disabled), styles.fontSize(13), css],
      ...(disabled ? {} : { onClick }),
    };

    const renderChildren = (
      <>
        {loading ? <div css={styles.loading} /> : null}
        <span css={styles.text}>{children}</span>
      </>
    );

    if (href) {
      return (
        <a ref={ref as Ref<HTMLAnchorElement>} href={href} rel="noopener noreferrer" target={target} {...props}>
          {renderChildren}
        </a>
      );
    }
    return (
      <button ref={ref as Ref<HTMLButtonElement>} type={type} {...props}>
        {renderChildren}
      </button>
    );
  },
);

Button.displayName = 'Button';
