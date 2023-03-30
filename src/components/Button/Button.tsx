import { Spinner } from '@app/components/Spinner';
import { forwardRef, ForwardRefRenderFunction, Ref } from 'react';

import * as styles from './styles';
import { ButtonProps } from './types';

const getLoadingSize = (size: Size) => {
  switch (size) {
    case 'large':
      return 12;
    case 'medium':
      return 10;
    case 'small':
      return 8;
    case 'extra-small':
      return 7;
  }
};

const ButtonInternal: ForwardRefRenderFunction<HTMLElement, ButtonProps> = (
  {
    href,
    children,
    target = 'self',
    size = 'medium',
    block = false,
    disabled = false,
    loading = false,
    type = 'button',
    css,
    Icon,
    backgroundColor = 'primary',
    color = 'light',
    onClick,
    ...rest
  },
  ref,
) => {
  const loadingSize = getLoadingSize(size);
  const props = {
    ...rest,
    css: [styles.container({ size, backgroundColor, color }), styles.block(block), styles.disabled(disabled), css],
    ...(disabled ? {} : { onClick }),
  };

  const renderChildren = (
    <>
      {loading ? (
        <div css={styles.loading}>
          <Spinner color="light" thickness={loadingSize} />
        </div>
      ) : Icon ? (
        <div css={styles.loading}>{Icon}</div>
      ) : null}
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
};

export const Button = forwardRef(ButtonInternal);
