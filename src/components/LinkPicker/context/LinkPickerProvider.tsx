import { LinkPickerProps } from '@app/components/LinkPicker/@types';
import { createContext, FC, useContext } from 'react';

interface ILinkPickerContext extends LinkPickerProps {}

const LinkPickerContext = createContext<ILinkPickerContext | null>(null);

export const useLinkPicker = () => {
  const context = useContext(LinkPickerContext);
  if (context === null) {
    throw new Error('Error to connect Context');
  }
  return context;
};

export const LinkPickerProvider: FC<LinkPickerProps> = ({ value, onChange, children }) => {
  return <LinkPickerContext.Provider value={{ value, onChange, children }}>{children}</LinkPickerContext.Provider>;
};
