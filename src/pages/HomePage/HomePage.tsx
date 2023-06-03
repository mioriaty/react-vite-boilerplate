import Checkbox from '@app/components/Checkbox';
import { Highlight } from '@app/components/Highlight';
import { Spinner } from '@app/components/Spinner';
import Switch from '@app/components/Switch';
import { Tooltip } from '@app/components/Tooltip';
import {
  DemoAutocomplete,
  DemoModal,
  DemoModalStep,
  DemoPostmessage,
  DemoTodo,
  DemoUseTransition,
  DemoWebWorker,
} from '@app/containers/DemoFeatures';
import { http } from '@app/httpHandler';
import { FC, useEffect, useState } from 'react';

export const HomePage: FC = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cacheStorage = window.caches;
      const cache = await cacheStorage.open('my-cache');
      const url = 'https://randomuser.me/api/';

      // check response đã được lưu trong CacheStorage hay chưa
      const cachedResponse = await cache.match(url);
      if (cachedResponse) {
        const cachedData = await cachedResponse.json();
        setData(cachedData);
      } else {
        const response = await http.request({
          url,
        });
        setData(response.data);
        await cache.put(url, new Response(JSON.stringify(response.data)));
      }
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div css={{ padding: '10px' }}>
      <div>{data && !loading ? <pre>{JSON.stringify(data)}</pre> : <p>Loading...</p>}</div>
      <button onClick={fetchData}>Reload</button>
      <hr />
      <hr />
      <Highlight highlightCss={{ backgroundColor: '#FEEBC8', padding: '2px' }} query={['spotlight', 'you']}>
        With the Highlight component, you can spotlight words.
      </Highlight>
      <hr />
      <hr />
      <Tooltip placement="bottom" portal text="heheeh">
        <Switch onValueChange={console.log} />
      </Tooltip>
      <hr />
      <hr />
      <Checkbox>Label</Checkbox>
      <hr />
      <hr />
      <Spinner />
      <hr />
      <hr />
      <DemoTodo />
      <hr />
      <hr />
      <DemoModalStep />
      <hr />
      <hr />
      <DemoAutocomplete />
      <hr />
      <hr />
      <DemoModal />
      <hr />
      <hr />
      <DemoWebWorker />
      <hr />
      <hr />
      <DemoPostmessage />
      <hr />
      <hr />
      <DemoUseTransition />
    </div>
  );
};
