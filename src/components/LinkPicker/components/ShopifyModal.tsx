import { useShopifyModalVisible } from '@app/components/LinkPicker/@types';
import { useLinkPicker } from '@app/components/LinkPicker/context/LinkPickerProvider';
import { MyModal } from '@app/components/Modal';

const data = [
  { value: 'page-1', label: 'Page 1' },
  { value: 'page-2', label: 'Page 2' },
  { value: 'page-3', label: 'Page 3' },
];

export const ShopifyModal = () => {
  const [visible, setVisible] = useShopifyModalVisible();
  const { value, onChange } = useLinkPicker();
  return (
    <MyModal
      isVisible={visible}
      onCancel={() => {
        setVisible(false);
      }}
    >
      {data.map(item => (
        <div
          key={item.value}
          css={{
            border: `1px solid ${item.value === value ? 'red' : ' black'}`,
            padding: '4px 8px',
            marginBottom: '4px',
            cursor: 'pointer',
          }}
          onClick={() => {
            onChange?.(item.value);
            setVisible(false);
          }}
        >
          {item.value}
        </div>
      ))}
    </MyModal>
  );
};
