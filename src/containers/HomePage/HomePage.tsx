import { FC } from 'react';

import { DemoAutocomplete, DemoModal, DemoModalStep, DemoPostmessage, DemoTodo, DemoUseTransition, DemoWebWorker } from '../DemoFeatures';

export const HomePage: FC = () => {
  return (
    <div css={{ padding: '10px' }}>
      <DemoTodo />
      <hr />
      <hr />
      <DemoModalStep />
      <hr />
      <hr />
      <DemoAutocomplete />
      <hr />
      <hr />
      <DemoModal />
      <hr />
      <hr />
      <DemoWebWorker />
      <hr />
      <hr />
      <DemoPostmessage />
      <hr />
      <hr />
      <DemoUseTransition />
    </div>
  );
};
