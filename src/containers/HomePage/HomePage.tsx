import { FC } from 'react';

import { DemoAutocomplete, DemoModal, DemoPostmessage, DemoWebWorker } from '../DemoFeatures';
import { DemoTodo } from '../DemoFeatures/Todo';
import { DemoUseTransition } from '../DemoFeatures/UseTransition';

export const HomePage: FC = () => {
  return (
    <div css={{ padding: '10px' }}>
      <DemoTodo />
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
