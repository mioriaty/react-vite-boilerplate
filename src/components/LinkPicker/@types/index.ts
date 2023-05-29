import { ReactNode } from 'react';
import { createGlobalState } from 'react-use';

export interface LinkPickerProps {
  value: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
}

export const useShopifyModalVisible = createGlobalState<boolean>(false);
