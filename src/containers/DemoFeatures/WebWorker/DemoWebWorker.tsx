import { Tabs } from '@app/components/Tabs';

import { BlockingUI } from './Map/BlockingUI';
import { WithUseWorker } from './Map/WithUseWorker';

export const DemoWebWorker = () => {
  return (
    <div>
      <h2>Demo fetch with web worker</h2>
      <div css={{ width: '400px' }}>
        <Tabs
          defaultValue="with-worker"
          data={[
            { label: 'With web worker', value: 'with-worker' },
            { label: 'Blocking UI', value: 'blocking' },
          ]}
          tabCss={({ colors }) => ({
            backgroundColor: colors.light,
            borderBottom: `1px solid ${colors.gray3}`,
          })}
        >
          {value => (
            <>
              {value === 'with-worker' && <WithUseWorker />}
              {value === 'blocking' && <BlockingUI />}
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};
