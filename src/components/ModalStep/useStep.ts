import { useCallback, useState } from 'react';

import { UseStepParams, UseStepResponse } from './types';

const FIRST_STEP = 0;

export function useStep({ steps, initialStep = FIRST_STEP }: UseStepParams): UseStepResponse {
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

  const go = (nextStep: number | string) => setIndex(inRange(nextStep));
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  return {
    index,
    navigation: { next, go, previous: prev },
    step,
  };
}
