import { FC } from 'react';

import { DemoAutocomplete, DemoModal, DemoPostmessage, DemoWebWorker } from '../DemoFeatures';

export const HomePage: FC = () => {
  return (
    <div css={{ padding: '10px' }}>
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
    </div>
  );
};
