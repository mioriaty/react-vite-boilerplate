import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

export const ErrorPage: FC = () => {
  const error = useRouteError() as Error;

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
};
