import { Button } from '@app/components/Button';
import { useShopifyModalVisible } from '@app/components/LinkPicker/@types';
import { ShopifyModal } from '@app/components/LinkPicker/components/ShopifyModal';
import { useLinkPicker } from '@app/components/LinkPicker/context/LinkPickerProvider';
import { Tabs } from '@app/components/Tabs';
import { useState } from 'react';

type Type = 'custom' | 'shopify' | 'phone';

export const Form = () => {
  const [type, setType] = useState<Type>('custom');
  const { value: valueState, onChange } = useLinkPicker();
  const [, setVisible] = useShopifyModalVisible();

  return (
    <div>
      <Tabs
        onChange={setType}
        defaultValue={type}
        value={type}
        data={[
          { value: 'custom', label: 'Custom' },
          { value: 'phone', label: 'Phone' },
          { value: 'shopify', label: 'Shopify' },
        ]}
      >
        {value => (
          <div css={{ marginTop: '10px' }}>
            {value === 'custom' && (
              <input
                value={valueState}
                onChange={event => {
                  const val = event.target.value;
                  onChange?.(val);
                }}
                type={'text'}
                placeholder="type something"
              />
            )}
            {value === 'phone' && (
              <input
                value={valueState}
                onChange={event => {
                  const val = event.target.value;
                  onChange?.(val);
                }}
                type={'tel'}
                placeholder="eg: 098812"
              />
            )}
            {value === 'shopify' && (
              <div>
                <Button
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Open modal
                </Button>
                <ShopifyModal />
              </div>
            )}
          </div>
        )}
      </Tabs>
    </div>
  );
};
