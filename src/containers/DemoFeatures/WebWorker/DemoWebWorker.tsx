import { useState } from 'react';

import { BlockingUI } from './Map/BlockingUI';
import { WithUseWorker } from './Map/WithUseWorker';

export const DemoWebWorker = () => {
  const [tab, setTab] = useState('');

  return (
    <div>
      <h2>Demo fetch with web worker</h2>
      <ul>
        <li
          role={'button'}
          css={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => {
            setTab('with-worker');
          }}
        >
          With useWorker
        </li>
        <li
          css={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => {
            setTab('blocking-ui');
          }}
        >
          Blocking UI
        </li>
      </ul>
      <div css={{ width: '400px' }}>{tab === 'with-worker' ? <WithUseWorker /> : tab === 'blocking-ui' ? <BlockingUI /> : null}</div>
    </div>
  );
};
