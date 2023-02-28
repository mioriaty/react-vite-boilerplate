import { useTheme } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

import { pmIframe } from '../HomePage/postmessage';

export const IframePage: FC = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [draggingId, setDraggingId] = useState<string | undefined>(undefined);

  const theme = useTheme();

  useEffect(() => {
    const off1 = pmIframe.on('@sections', data => {
      setSections(data.payload.sections);
    });
    const off2 = pmIframe.on('@draggingId', data => {
      setDraggingId(data.payload);
    });
    return () => {
      off1();
      off2();
    };
  }, []);

  return (
    <div>
      {sections.map(item => (
        <div
          key={item.id}
          css={{
            marginBottom: '5px',
            backgroundColor: theme.colors.light,
            padding: '10px',
            borderRadius: '4px',
            userSelect: 'none',
            fontFamily: theme.fonts.secondary,
            color: draggingId && item.id === draggingId ? theme.colors.primary : theme.colors.gray8,
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
