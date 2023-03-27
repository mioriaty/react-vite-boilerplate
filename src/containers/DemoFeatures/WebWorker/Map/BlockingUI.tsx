import { Button } from '@app/components/Button';
import { Spinner } from '@app/components/Spinner';
import { useEffect, useState } from 'react';

import data from './data';
import generateMap from './generateCombined';

export const BlockingUI = () => {
  const [seatLayout, setSeatLayout] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSeatLayout(generateMap(data));
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  const renderData = () => {
    return seatLayout ? <div dangerouslySetInnerHTML={{ __html: seatLayout }} /> : <Spinner />;
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Get Data</Button>
      {visible && renderData()}
    </div>
  );
};
