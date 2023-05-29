import { LinkPickerProps } from '@app/components/LinkPicker/@types';
import { Form } from '@app/components/LinkPicker/components/Form';
import { LinkPickerProvider } from '@app/components/LinkPicker/context/LinkPickerProvider';
import { FC } from 'react';

export const LinkPicker: FC<LinkPickerProps> = ({ value, onChange }) => {
  return (
    <LinkPickerProvider value={value} onChange={onChange}>
      <Form />
    </LinkPickerProvider>
  );
};
