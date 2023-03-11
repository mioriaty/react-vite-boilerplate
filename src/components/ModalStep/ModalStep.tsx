import { FC, useEffect } from 'react';
import { useDeepCompareEffect } from 'react-use';

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
      callback({ next: navigation.next, previous: navigation.previous, go: navigation.go });
    });
    return () => {
      navigateHandlers.delete(id);
    };
  }, [navigation, id]);

  useDeepCompareEffect(() => {
    if (visible) {
      onChange?.({ step, indexStep: index });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[visible], [index]]);

  const _renderStepHeader = data.map((item, index) => {
    const _stepIdx = index + 1;

    return (
      <div key={item.id} className="step-modal__dot-container" css={styles.dotContainer}>
        <div className="step-modal__dot-index" css={styles.dot(item.id === step.id)}>
          {_stepIdx}
        </div>
        <div className="step-modal__dot-text" css={styles.dotText}>
          <span>Step {_stepIdx}</span>
          <br />
          {item.stepDescription && <span>{item.stepDescription}</span>}
        </div>
      </div>
    );
  });

  const _renderContent = () => {
    return (
      <div css={styles.container}>
        <div css={styles.steps}>{_renderStepHeader}</div>

        <div css={styles.item}>
          {step.heading && <div css={styles.title}>{step.heading}</div>}
          <div>{step.content}</div>
        </div>

        {step.buttons && (
          <div className="step-modal__footer">{step.buttons?.({ go: navigation.go, next: navigation.next, previous: navigation.previous })}</div>
        )}
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
      bodyCss={styles.modalBody}
      contentCss={styles.modalChild}
    >
      {data.length ? _renderContent() : 'Empty'}
    </MyModal>
  );
};

ModalStep.getId = (id: StepModalProps['id']) => {
  const onNavigate = navigateHandlers.get(id);
  if (onNavigate) {
    return {
      onNavigate,
    };
  }
  throw new Error(`StepModal: ${id} not exist`);
};
