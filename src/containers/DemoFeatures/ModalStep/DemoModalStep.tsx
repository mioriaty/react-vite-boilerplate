import { Button } from '@app/components/Button';
import { ModalStep } from '@app/components/ModalStep/ModalStep';
import { useState } from 'react';

export const DemoModalStep = () => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  return (
    <div>
      <h2>Demo Modal Step</h2>
      <Button onClick={() => setVisible1(true)}>Open 1</Button>
      <ModalStep
        visible={visible1}
        id="modal1"
        onClose={() => setVisible1(false)}
        data={[
          { id: '1', content: 'Step 1', heading: 'Đây là step 1' },
          { id: '2', content: 'Step 2', heading: 'Đây là step 2' },
          { id: '3', content: 'Step 3', heading: 'Đây là step 3' },
          { id: '4', content: 'Step 4', heading: 'Đây là step 4' },
        ]}
        onChange={console.log}
      />

      <Button onClick={() => setVisible2(true)}>Open 2</Button>
      <ModalStep
        visible={visible2}
        id="modal2"
        data={[
          { id: '1', content: 'Step 1', heading: 'Đây là step 1' },
          { id: '2', content: 'Step 2', heading: 'Đây là step 2' },
          { id: '3', content: 'Step 3', heading: 'Đây là step 3' },
          { id: '4', content: 'Step 4', heading: 'Đây là step 4' },
        ]}
        onChange={console.log}
        onClose={() => setVisible2(false)}
      />
    </div>
  );
};
