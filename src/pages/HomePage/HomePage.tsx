import { Highlight } from '@app/components/Highlight';
import { DemoModalStep, DemoPostmessage, DemoUseTransition } from '@app/containers/DemoFeatures';
import { FC } from 'react';

export const HomePage: FC = () => {
  return (
    <div css={{ padding: '10px' }}>
      <Highlight highlightCss={{ backgroundColor: '#FEEBC8', padding: '2px' }} query={['spotlight', 'you']}>
        With the Highlight component, you can spotlight words.
      </Highlight>
      <DemoModalStep />
      <hr />
      <hr />
      <DemoPostmessage />
      <hr />
      <hr />
      <DemoUseTransition />
    </div>
  );
};
