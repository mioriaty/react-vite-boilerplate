import { Tooltip } from '@app/components/Tooltip';
import { FC, ReactNode } from 'react';

export interface ProtectedComponentProps {
  role: 'free' | 'business';
  children: ReactNode;
}
export const ProtectedComponent: FC<ProtectedComponentProps> = ({ role, children }) => {
  if (role === 'business') {
    return (
      <Tooltip portal placement="bottom" text="Bạn cần nâng cấp gói để dùng tính năng này">
        <div css={{ opacity: '0.6' }}>{children}</div>
      </Tooltip>
    );
  }
  return <>{children}</>;
};
