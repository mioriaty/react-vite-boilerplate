import { Button } from '@app/components/Button';
import { Spinner } from '@app/components/Spinner';
import { useState } from 'react';

import data from './data';
import { useGenerateWithWorker } from './useGenerateSeatMap';

export const WithUseWorker = () => {
  const { seatLayout, isPending, isSuccess } = useGenerateWithWorker(data);
  const [visible, setVisible] = useState(false);

  const renderContent = () => {
    return isPending ? (
      <Spinner />
    ) : isSuccess && seatLayout ? (
      <div dangerouslySetInnerHTML={{ __html: seatLayout }} />
    ) : (
      <div>Error generating seat map!</div>
    );
  };

  return (
    <div>
      <Button size="extra-small" onClick={() => setVisible(true)}>
        Get Data
      </Button>
      {visible && renderContent()}
    </div>
  );
};
