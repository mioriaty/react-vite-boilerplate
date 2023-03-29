import { useCallback, useState } from 'react';

import { UseStepParams } from './types';

const FIRST_STEP = 0;

export function useStep({ steps, initialStep = FIRST_STEP }: UseStepParams) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(initialStep);
  const step = steps[index];

  const inRange = useCallback(
    (index: number | string) => {
      if (typeof index === 'number') {
        if (index < FIRST_STEP) {
          return FIRST_STEP;
        }
        if (index >= steps.length) {
          return steps.length - 1;
        }
        return index;
      }

      return steps.findIndex(step => step.id === index) || FIRST_STEP;
    },
    [steps],
  );

  const complete = (completeStep: number | string = index) => {
    const completeStepIndex = inRange(completeStep);
    const id = steps[completeStepIndex].id;

    setCompleted([...new Set([...completed, id])]);
  };

  const go = (nextStep: number | string) => setIndex(inRange(nextStep));
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  return { completed, index, navigation: { next, go, previous: prev }, step, complete };
}
