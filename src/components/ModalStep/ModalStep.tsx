import { FC, useEffect } from 'react';

import { MyModal } from '../Modal/Modal';
import * as styles from './styles';
import { Navigate, StepModalProps, StepModalStatic } from './types';
import { useStep } from './useStep';

const navigateHandlers = new Map<string, Navigate>();

export const ModalStep: FC<StepModalProps> & StepModalStatic = ({
  data = [],
  initialStep = 0,
  visible = false,
  headerText = 'Steps Modal',
  id,
  onClose,
  onChange,
}) => {
  const { navigation, step, index } = useStep({ steps: data, initialStep });

  useEffect(() => {
    navigateHandlers.set(id, callback => {
      callback({
        next: navigation.next,
        previous: navigation.previous,
      });
    });
    return () => {
      navigateHandlers.delete(id);
    };
  }, [id, navigation.next, navigation.previous]);

  useEffect(() => {
    if (visible) {
      onChange?.({ indexStep: index, step });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, index, step]);

  const renderStepDot = data.map((item, _index, originArr) => {
    const _stepIdx = _index + 1;
    return (
      <div className="step-modal__dot-container" key={item.id} css={[styles.dotContainer, { width: `calc(100% / ${originArr.length})` }]}>
        <div
          onClick={() => {
            navigation.go(item.id);
          }}
          css={[
            styles.dot,
            {
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: item.id === step.id ? 'primary' : 'gray4',
            },
          ]}
        >
          {_stepIdx}
        </div>
        <div className="step-modal__dot-text" css={styles.dotText}>
          <span>Step {_stepIdx}</span>
          <br />
          {item.stepDescription && (
            <span color="gray5" css={{ fontSize: '12px' }}>
              {item.stepDescription}
            </span>
          )}
        </div>
      </div>
    );
  });

  const renderContent = () => {
    return (
      <div css={styles.container}>
        <div css={styles.steps}>{renderStepDot}</div>

        <div css={styles.item}>
          <div css={styles.title}>{step.heading}</div>
          <div>{step.content}</div>
        </div>

        {step.buttons && <div className="step-modal__footer">{step.buttons}</div>}
      </div>
    );
  };

  return (
    <MyModal
      headerText={headerText}
      okText={''}
      cancelText={''}
      isVisible={visible}
      onCancel={onClose}
      depsHeightRecalculation={step}
      bodyCss={styles.modalBody}
      contentCss={{ height: '100%' }}
    >
      {data.length ? renderContent() : 'Empty'}
    </MyModal>
  );
};

ModalStep.getId = (id: StepModalProps['id']) => {
  const onChange = navigateHandlers.get(id);
  if (onChange) {
    return {
      onChange,
    };
  }
  throw new Error(`StepModal: ${id} not exist`);
};
