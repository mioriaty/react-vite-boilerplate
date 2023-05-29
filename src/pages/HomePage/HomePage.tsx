import Checkbox from '@app/components/Checkbox';
import { Highlight } from '@app/components/Highlight';
import { Spinner } from '@app/components/Spinner';
import Switch from '@app/components/Switch';
import { Tooltip } from '@app/components/Tooltip';
import {
  DemoAutocomplete,
  DemoModal,
  DemoModalStep,
  DemoPostmessage,
  DemoTodo,
  DemoUseTransition,
  DemoWebWorker,
} from '@app/containers/DemoFeatures';
import { FC } from 'react';

export const HomePage: FC = () => {
  return (
    <div css={{ padding: '10px' }}>
      <Highlight highlightCss={{ backgroundColor: '#FEEBC8', padding: '2px' }} query={['spotlight', 'you']}>
        With the Highlight component, you can spotlight words.
      </Highlight>
      <hr />
      <hr />
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
