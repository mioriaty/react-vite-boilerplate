import { useState } from 'react';
import { Step, UseStepParams, UseStepResponse, NavigationProps } from './types';

const error = (msg: string) => {
  throw new Error(msg);
};

const getIndexById = (arr: Step[], matchId: string) => arr.findIndex(({ id }) => id === matchId);

export const useStep = ({ initialStep = 0, steps }: UseStepParams): UseStepResponse => {
  const initialStepIndex = typeof initialStep === 'number' ? initialStep : getIndexById(steps, initialStep);

  const [index, setStep] = useState(initialStepIndex);
  const step = steps[index];

  const handleSetStep = (delta = 1) => {
    setStep((index + steps.length + delta) % steps.length);
  };

  const navigation: NavigationProps = {
    next: () => handleSetStep(1),
    previous: () => handleSetStep(-1),
    go: newStep => {
      const newStepId = getIndexById(steps, newStep);
      if (newStepId === -1) {
        error(`useStep: go("${newStep}") not found in steps`);
      }
      setStep(newStepId);
    },
  };

  return {
    index,
    step,
    navigation,
  };
};
