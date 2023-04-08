import { AsyncComponent } from '@app/components/AsyncComponent';
import { Button } from '@app/components/Button';
import { useAppDispatch, useAppSelector } from '@app/store';
import { useRef } from 'react';

import { getTodos, todoSelector } from './store';

export const DemoTodo = () => {
  const { todo, getStatus } = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();
  const promise = useRef<string | null>(null);

  return (
    <div css={{ width: '600px' }}>
      <h2>Demo todo</h2>
      <Button
        onClick={() => {
          dispatch(getTodos({}));
          promise.current = 'REQUESTING';
        }}
        css={{ marginRight: '8px' }}
      >
        Get todos
      </Button>
      <Button>Cancel get todos</Button>
      <AsyncComponent
        status={getStatus}
        Success={
          <div>
            <pre>{JSON.stringify(todo, null, 2)}</pre>
          </div>
        }
      />
    </div>
  );
};
