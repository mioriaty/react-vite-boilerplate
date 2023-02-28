import { useWorker, WORKER_STATUS } from '@koale/useworker';
import { TRANSFERABLE_TYPE } from '@koale/useworker/dist/useWorker';
import { useEffect, useMemo, useState } from 'react';

import generateMap from './generateCombined';

type WorkerOptions = {
  timeout?: number;
  remoteDependencies?: string[];
  autoTerminate?: boolean;
  transferable?: TRANSFERABLE_TYPE;
};

export const useGenerateWithWorker = (seatData: any, options?: any, workerOption?: WorkerOptions) => {
  const [generateWorker, { kill: killWorker, status: generateMapStatus }] = useWorker(generateMap, workerOption);
  const [seatLayout, setSeatLayout] = useState('');
  const [error, setError] = useState();

  const handleGenerateMap = async () => {
    try {
      const svgString = await generateWorker(seatData, options);
      setSeatLayout(svgString);
    } catch (err) {
      console.error(err);
      setError(error);
    }
  };

  const isStale = useMemo(() => {
    return generateMapStatus === WORKER_STATUS.PENDING;
  }, [generateMapStatus]);

  const isPending = useMemo(() => {
    return generateMapStatus === WORKER_STATUS.PENDING || generateMapStatus === WORKER_STATUS.RUNNING;
  }, [generateMapStatus]);

  const isSuccess = useMemo(() => {
    return generateMapStatus === WORKER_STATUS.SUCCESS;
  }, [generateMapStatus]);

  const isError = useMemo(() => {
    return generateMapStatus === WORKER_STATUS.ERROR || generateMapStatus === WORKER_STATUS.TIMEOUT_EXPIRED || error;
  }, [generateMapStatus, error]);

  const isExpired = useMemo(() => {
    return generateMapStatus === WORKER_STATUS.TIMEOUT_EXPIRED;
  }, [generateMapStatus]);

  useEffect(() => {
    if (seatData) {
      handleGenerateMap();
    }

    return () => {
      killWorker();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seatData]);

  return {
    seatLayout,
    isStale,
    isPending,
    isSuccess,
    isError,
    isExpired,
  };
};
