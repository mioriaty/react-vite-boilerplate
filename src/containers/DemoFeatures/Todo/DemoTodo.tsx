import { AsyncComponent } from '@app/components/AsyncComponent';
import { Button } from '@app/components/Button';
import { useAppDispatch, useAppSelector } from '@app/hooks/useAppRedux';

import { todoActions, todoSelector } from './store';

export const DemoTodo = () => {
  const { todo, getStatus } = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();

  return (
    <div css={{ width: '600px' }}>
      <h2>Demo todo</h2>
      <Button
        onClick={async () => {
          dispatch(todoActions.getTodos({ search: 'test' }));
        }}
        css={{ marginRight: '8px' }}
      >
        Get todos
      </Button>
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
