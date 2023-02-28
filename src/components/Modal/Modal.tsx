import { createPortal } from '@app/utils/functions/createPortal';
import { Interpolation, Theme } from '@emotion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { Button } from '../Button';
import { ScrollBar } from '../Scrollbar/Scrollbar';
import ModalHeader from './ModalHeader';
import * as styles from './styles';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export interface MyModalProps<T extends any = any> {
  children: ReactNode;
  size?: 'medium' | 'large' | 'small';
  headerText?: ReactNode;
  isVisible: boolean;
  isLoading?: boolean;
  cancelText?: string;
  okText?: string;
  scrollDisabled?: boolean;
  contentCss?: Interpolation<Theme>;
  bodyCss?: Interpolation<Theme>;
  /** Để tính lại chiều cao cho modal */
  depsHeightRecalculation?: T;
  FooterRight?: ReactNode;
  FooterLeft?: ReactNode;
  disabledCloseButton?: boolean;
  onCancel?: () => void;
  /** Event cancel cho riêng nút button ( không phải nút x hay overlay ) */
  onButtonCancel?: () => void;
  onOk?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const MyModal = <T extends any = any>({
  size = 'small',
  children,
  headerText = '',
  isVisible,
  isLoading = false,
  disabledCloseButton = false,
  cancelText: cancelTextProp,
  scrollDisabled = false,
  okText: okTextProp,
  contentCss,
  bodyCss,
  depsHeightRecalculation,
  onButtonCancel,
  onCancel,
  onOk,
  FooterRight,
  FooterLeft,
}: MyModalProps<T>) => {
  const [height, setHeight] = useState<string>('auto');
  const childRef = useRef<HTMLDivElement | null>(null);
  const cancelText = cancelTextProp ?? 'Ok';
  const okText = okTextProp ?? 'Cancel';

  const setHeightState = () => {
    const maxHeight = window.innerHeight - 60;
    if (childRef.current) {
      setHeight(
        childRef.current.offsetHeight >= maxHeight
          ? `${maxHeight}px`
          : `${childRef.current.offsetHeight + 50 + (!!cancelText || !!okText || !!FooterRight ? 56 : 0)}px`,
      );
    }
  };

  useEffect(() => {
    if (isVisible) {
      setHeightState();
      window.addEventListener('resize', setHeightState);
      return () => {
        window.removeEventListener('resize', setHeightState);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, depsHeightRecalculation]);

  const renderChild = (
    <div ref={childRef} css={[styles.child(size), contentCss]}>
      {children}
    </div>
  );

  const renderContent = (
    <div css={styles.container}>
      <div css={styles.overlay} onClick={onCancel} />
      <div css={[styles.content(size, height), bodyCss]}>
        <ModalHeader title={headerText} onClose={disabledCloseButton ? undefined : onCancel} />
        {scrollDisabled ? (
          <div css={styles.body(!!cancelText || !!okText || !!FooterRight)}>{renderChild}</div>
        ) : (
          <ScrollBar css={styles.body(!!cancelText || !!okText || !!FooterRight)}>{renderChild}</ScrollBar>
        )}
        <div css={styles.footer}>
          <div>{FooterLeft}</div>
          <div css={{ display: 'flex' }}>
            <div>
              <Button
                onClick={() => {
                  onButtonCancel?.();
                  onCancel?.();
                }}
              >
                {cancelText}
              </Button>
            </div>
            <div css={{ marginLeft: '10px' }}>
              {/* isLoading */}
              <Button
                onClick={() => {
                  if (isLoading) {
                    return;
                  } else {
                    onOk?.();
                  }
                }}
              >
                {okText}
              </Button>
            </div>
            {!!FooterRight && <div css={styles.footerRight}>{FooterRight}</div>}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isVisible) {
    return null;
  }

  return createPortal(renderContent, document.body);
};
