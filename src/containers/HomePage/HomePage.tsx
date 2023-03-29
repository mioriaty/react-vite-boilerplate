import Checkbox from '@app/components/Checkbox';
import { Spinner } from '@app/components/Spinner';
import Switch from '@app/components/Switch';
import { Tooltip } from '@app/components/Tooltip';
import { FC } from 'react';

import { DemoAutocomplete, DemoModal, DemoModalStep, DemoPostmessage, DemoTodo, DemoUseTransition, DemoWebWorker } from '../DemoFeatures';

export const HomePage: FC = () => {
  return (
    <div css={{ padding: '10px' }}>
      <Tooltip placement="bottom" portal text="heheeh">
        <Switch onValueChange={console.log} />
      </Tooltip>
      <hr />
      <hr />
      <Checkbox>Label</Checkbox>
      <hr />
      <hr />
      <Spinner />
      <hr />
      <hr />
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
