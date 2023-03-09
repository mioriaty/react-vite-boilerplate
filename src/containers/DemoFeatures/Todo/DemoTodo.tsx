import { AsyncComponent } from '@app/components/AsyncComponent';
import { TextInput } from '@app/components/TextInput';
import { withDebounce } from '@app/hocs/withDebounce';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useEffect } from 'react';

import { getTodos, setSearchKey, todoSelector } from './store';

const InputWithDebounce = withDebounce({ WrappedComponent: TextInput, propValue: 'value', propOnChange: 'onValueChange' });

export const DemoTodo = () => {
  const { todo, getStatus, searchKey } = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  return (
    <div>
      <h2>Demo todo</h2>
      <InputWithDebounce
        value={searchKey}
        onValueChange={val => {
          dispatch(setSearchKey(val));
        }}
      />
      <AsyncComponent status={getStatus} Success={JSON.stringify(todo, null, 2)} />
    </div>
  );
};
