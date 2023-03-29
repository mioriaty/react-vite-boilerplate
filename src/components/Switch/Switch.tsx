import { Spinner } from '@app/components/Spinner';
import classNames from '@app/utils/functions/classNames';
import { useTheme } from '@emotion/react';
import { forwardRef, ForwardRefRenderFunction, memo, useEffect, useState } from 'react';

import * as styles from './styles';
import { SwitchProps } from './types';

const getLoadingSize = (size: Size) => {
  switch (size) {
    case 'large':
      return 12;
    case 'medium':
      return 10;
    case 'small':
      return 8;
    case 'extra-small':
    default:
      return 6;
  }
};

const InternalSwitch: ForwardRefRenderFunction<HTMLDivElement, SwitchProps> = (
  {
    checked,
    defaultChecked = false,
    CheckedChildren,
    UnCheckedChildren,
    disabled = false,
    loading = false,
    size = 'medium',
    activeColor = 'primary',
    inactiveColor = 'gray4',
    onChange,
    onValueChange,
    className,
    containerCss,
    ExtraNode,
    radius,
  },
  ref,
) => {
  const [checkedState, setCheckedState] = useState(checked ?? defaultChecked);
  const loadingSize = getLoadingSize(size);
  const { colors } = useTheme();

  useEffect(() => {
    if (checked) {
      setCheckedState(checked);
    }
  }, [checked]);

  const toggleSwitch = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (loading || disabled) {
      return;
    }
    setCheckedState(!checkedState);
    onChange?.(event);
    onValueChange?.(!checkedState);
  };

  const renderInnerContent = () => {
    if (!CheckedChildren && !UnCheckedChildren) {
      return null;
    }
    const innerContent = checkedState ? CheckedChildren : UnCheckedChildren;

    return <div className="switch-inner">{innerContent}</div>;
  };

  const renderLoading = () => {
    return (
      <div className="switch-handler" css={styles.handle(size, checkedState)}>
        {loading && <Spinner thickness={loadingSize} speed={0.6} />}
      </div>
    );
  };

  return (
    <div ref={ref} css={containerCss} onClick={toggleSwitch}>
      <div
        className={classNames(className, 'Switch-container')}
        css={[
          { borderRadius: `${radius}px`, backgroundColor: checkedState ? colors[activeColor] : colors[inactiveColor] },
          styles.container(size),
          styles.disabled(disabled),
        ]}
      >
        {renderInnerContent()}
        {renderLoading()}
      </div>
      {ExtraNode?.(checkedState)}
    </div>
  );
};

const Switch = forwardRef<HTMLDivElement, SwitchProps>(InternalSwitch);
Switch.displayName = 'Switch';

export default memo(Switch);
