import { ReactNode } from 'react';

import { MyModalProps } from '../Modal/Modal';

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

export type Navigate = (callback: (navigation: NavigationProps) => void) => void;

export interface StepModalStatic {
  getId: (id: StepModalProps['id']) => {
    onNavigate: Navigate;
  };
}

export interface Step {
  id: string;
  heading: string;
  content: ReactNode;
  stepDescription?: string;
  buttons?: (params: NavigationProps) => ReactNode;
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
