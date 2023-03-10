import { AsyncComponent } from '@app/components/AsyncComponent';
import { TextInput } from '@app/components/TextInput';
import { withDebounce } from '@app/hocs/withDebounce';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useEffect } from 'react';

import { getTodos, todoSelector } from './store';

const _InputWithDebounce = withDebounce({ WrappedComponent: TextInput, propValue: 'value', propOnChange: 'onValueChange' });

export const DemoTodo = () => {
  const { todo, getStatus } = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div>
      <h2>Demo todo</h2>
      <AsyncComponent status={getStatus} Success={JSON.stringify(todo, null, 2)} />
    </div>
  );
};
