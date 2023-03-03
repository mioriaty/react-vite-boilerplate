import { Loader } from '@app/components/Loader';
import { Tabs } from '@app/components/Tabs';
import { TextInput } from '@app/components/TextInput';
import { Dispatch, useEffect, useState, useTransition } from 'react';

import { demoText } from './text';

const init_text = <span>{demoText}</span>;

const handleFilter = (query: string, setFilter: Dispatch<React.SetStateAction<any>>) => {
  setFilter(() => {
    if (!query || query.trim().length === 0) {
      return init_text;
    }
    const reg = new RegExp(query.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'ig');
    const node = demoText
      .replaceAll(reg, s => `##${s}##`)
      .split('##')
      .map((s, i) => {
        return (
          <span
            key={i}
            css={
              i % 2 === 1
                ? {
                    fontWeight: '700',
                    color: 'black',
                    backgroundColor: '#ffff02',
                    padding: '0 6px',
                  }
                : undefined
            }
          >
            {s}
          </span>
        );
      });
    return node;
  });
};
const UnOptimized = () => {
  const [query, setQuery] = useState('');
  const [filteredNode, setFilteredNode] = useState(init_text);

  const onInputChange = (value: string) => setQuery(value);

  useEffect(() => {
    handleFilter(query, setFilteredNode);
  }, [query]);

  return (
    <>
      <div className="input">
        <TextInput onValueChange={onInputChange} />
      </div>
      <div className="text">{filteredNode}</div>
    </>
  );
};

const WithUseTransition = () => {
  const [query, setQuery] = useState('');
  const [filteredNode, setFilteredNode] = useState(init_text);
  const [pending, startTransition] = useTransition();

  const onInputChange = (value: string) => setQuery(value);

  useEffect(() => {
    startTransition(() => {
      handleFilter(query, setFilteredNode);
    });
  }, [query, startTransition]);

  return (
    <>
      {pending && <Loader />}
      <div className="input">
        <TextInput onValueChange={onInputChange} />
      </div>
      <div className="text">{filteredNode}</div>
    </>
  );
};

export const DemoUseTransition = () => {
  return (
    <div css={{ width: '1000px', height: '500px', overflow: 'auto' }}>
      <h2>Demo useTransition</h2>
      <Tabs
        defaultValue="transition"
        data={[
          { label: 'With useTransition', value: 'transition' },
          { label: 'Normal search', value: 'normal' },
        ]}
      >
        {value => (
          <>
            {value === 'transition' && <WithUseTransition />}
            {value === 'normal' && <UnOptimized />}
          </>
        )}
      </Tabs>
    </div>
  );
};
