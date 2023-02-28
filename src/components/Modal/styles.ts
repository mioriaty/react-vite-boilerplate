import { css, Theme } from '@emotion/react';

export type MyModalSize = 'medium' | 'large' | 'small';

export const container = css({
  position: 'fixed',
  inset: 0,
  zIndex: 15,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const overlay = () =>
  css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundColor: `rgba(0, 0, 0, 0.6)`,
  });

export const content =
  (size: MyModalSize, height: string) =>
  ({ colors }: Theme) =>
    css({
      backgroundColor: colors.light,
      borderRadius: '6px',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      ...(size === 'small'
        ? {
            width: '460px',
            height,
            minHeight: '150px',
          }
        : size === 'medium'
        ? {
            maxWidth: '1000px',
            width: 'calc(100% - 60px)',
            height: 'calc(100% - 100px)',
            margin: '30px 50px',
          }
        : {
            maxWidth: '1400px',
            width: 'calc(100% - 60px)',
            height: 'calc(100% - 100px)',
            margin: '30px 50px',
          }),
    });

export const body = (hasFooter: boolean) =>
  css({
    height: `calc(100% - 50px - ${hasFooter ? '56px' : '0px'}) !important`,
  });

export const child = (size: MyModalSize) =>
  css({
    padding: '10px',
    ...(size === 'large' ? { height: '100%' } : {}),
  });

export const footer = ({ colors }: Theme) =>
  css({
    padding: '10px',
    borderTop: `1px solid ${colors.gray3}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: `${colors.light}`,
    position: 'relative',
    zIndex: 2,
  });

export const footerRight = css({
  marginLeft: '10px',
  display: 'flex',
  alignItems: 'center',
});

const HEADER_HEIGHT = 50;

export const containerHeader = ({ colors }: Theme) =>
  css({
    height: `${HEADER_HEIGHT}px`,
    backgroundColor: colors.light,
    borderBottom: `1px solid ${colors.gray3}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px 10px',
  });

export const close = css({
  width: '36px',
  height: '36px',
  lineHeight: '36px',
  textAlign: 'center',
  cursor: 'pointer',
});
