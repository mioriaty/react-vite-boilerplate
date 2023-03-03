import { Button } from '@app/components/Button';
import { MyModal, MyModalProps } from '@app/components/Modal';
import { useState } from 'react';

export const DemoModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalSize, setModalSize] = useState<MyModalProps['size']>('small');

  return (
    <div>
      <h2>Demo modal</h2>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Open modal
      </Button>
      <MyModal
        size={modalSize}
        isVisible={visible}
        headerText="header ne"
        onCancel={() => {
          setVisible(false);
          setModalSize('small');
        }}
        onOk={() => {
          setVisible(false);
          setModalSize('small');
        }}
      >
        Change modal size
        <div css={{ display: 'flex', columnGap: '4px' }}>
          <Button onClick={() => setModalSize('small')}>Small</Button>
          <Button onClick={() => setModalSize('medium')}>Medium</Button>
          <Button onClick={() => setModalSize('large')}>Large</Button>
        </div>
      </MyModal>
    </div>
  );
};
