import { ReactNode } from 'react';
import { MyModalProps } from 'src/MyModal/MyModal';

export interface OnChangeParams {
  step: Step;
  indexStep: number;
}

export interface StepModalProps {
  id: string;
  data: Step[];
  visible: MyModalProps['isVisible'];
  initialStep?: number;
  headerText?: MyModalProps['headerText'];
  onClose?: MyModalProps['onCancel'];
  onChange?: ({ indexStep, step }: OnChangeParams) => void;
}

export type Navigate = (callback: (navigation: Omit<NavigationProps, 'go'>) => void) => void;

export interface StepModalStatic {
  getId: (id: StepModalProps['id']) => {
    onChange: Navigate;
  };
}

export interface Step {
  id: string;
  heading: string;
  content: ReactNode;
  stepDescription?: string;
  buttons?: ReactNode;
}

export interface UseStepParams {
  initialStep?: number;
  steps: Step[];
}

export interface UseStepResponse {
  index: number;
  step: Step;
  navigation: NavigationProps;
}

export interface NavigationProps {
  next: () => void;
  previous: () => void;
  go: (stepId: string) => void;
}
