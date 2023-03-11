import { Button } from '@app/components/Button';
import { ModalStep, Step } from '@app/components/ModalStep';
import { useEffect, useState } from 'react';

export const DemoModalStep = () => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step | undefined>(undefined);

  useEffect(() => {
    console.log(step);
  }, [step]);

  const renderForm = (
    <div>
      <div
        onClick={() => {
          ModalStep.getId('my_modal').onNavigate(({ next }) => {
            next();
          });
        }}
      >
        move
      </div>
    </div>
  );

  return (
    <div>
      <h2>Demo Modal Step</h2>
      <Button onClick={() => setVisible(true)}>Open 1</Button>
      <ModalStep
        id="my_modal"
        visible={visible}
        data={[
          {
            id: '1',
            heading: 'hehe',
            content: (
              <div>
                Hello step 1
                <hr />
                {renderForm}
              </div>
            ),
            stepDescription: 'Download',
            buttons: ({ next }) => (
              <div>
                <Button onClick={next}>Next</Button>
              </div>
            ),
          },
          {
            id: '2',
            heading: 'hoho',
            content: <div>Step 2</div>,
            stepDescription: 'Active on shopify',
            buttons: ({ previous }) => (
              <div>
                <Button onClick={previous}>Prev</Button>
              </div>
            ),
          },
        ]}
        onChange={result => {
          setStep(result.step);
        }}
        onClose={() => {
          setVisible(false);
          setStep(undefined);
        }}
      />
    </div>
  );
};
