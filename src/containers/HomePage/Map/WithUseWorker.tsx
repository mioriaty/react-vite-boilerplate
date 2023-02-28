import { Loader } from '@app/components/Loader';

import data from './data';
import { useGenerateWithWorker } from './useGenerateSeatMap';

export const WithUseWorker = () => {
  const { seatLayout, isPending, isSuccess } = useGenerateWithWorker(data);

  return isPending ? (
    <Loader />
  ) : isSuccess && seatLayout ? (
    <div dangerouslySetInnerHTML={{ __html: seatLayout }} />
  ) : (
    <div>Error generating seat map!</div>
  );
};
