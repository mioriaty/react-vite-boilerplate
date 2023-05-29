import Checkbox from '@app/components/Checkbox';
import { Highlight } from '@app/components/Highlight';
import { LinkPicker } from '@app/components/LinkPicker/LinkPicker';
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
import { FC, useState } from 'react';

export const HomePage: FC = () => {
  const [value1, setValue1] = useState('hehe 1');
  const [value2, setValue2] = useState('');
  return (
    <div css={{ padding: '10px' }}>
      <LinkPicker value={value1} onChange={setValue1} />
      {value1}
      <hr />
      <LinkPicker value={value2} onChange={setValue2} />
      {value2}
      <hr />
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
