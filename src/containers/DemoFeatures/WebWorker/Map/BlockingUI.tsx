import { Loader } from '@app/components/Loader';
import { useEffect, useState } from 'react';

import data from './data';
import generateMap from './generateCombined';

export const BlockingUI = () => {
  const [seatLayout, setSeatLayout] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSeatLayout(generateMap(data));
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return seatLayout ? <div dangerouslySetInnerHTML={{ __html: seatLayout }} /> : <Loader />;
};
