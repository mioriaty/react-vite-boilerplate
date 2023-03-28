import { Spinner } from '@app/components/Spinner';
import { FC, ReactNode } from 'react';

export interface AsyncComponentProps {
  status: Status;
  Request?: ReactNode;
  Success: ReactNode;
  Failure?: ReactNode;
  Empty?: ReactNode;
  isEmpty?: boolean;
}

const RequestComponent: FC = () => {
  return (
    <div css={{ padding: '80px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner size="medium" />
    </div>
  );
};

const FailureComponent: FC = () => {
  return <div css={{ maxWidth: '600px', margin: 'auto', padding: '80px 10px' }}>oops</div>;
};

const EmptyComponent: FC = () => {
  return <div css={{ padding: '20px 0' }}>Empty</div>;
};

export const AsyncComponent: FC<AsyncComponentProps> = ({
  status,
  Request = <RequestComponent />,
  Success,
  Failure = <FailureComponent />,
  Empty = <EmptyComponent />,
  isEmpty = false,
}) => {
  const renderMapping: Record<Status, ReactNode> = {
    idle: null,
    loading: Request,
    success: isEmpty ? Empty : Success,
    failure: Failure,
  };

  return <>{renderMapping[status]}</>;
};

export default AsyncComponent;
