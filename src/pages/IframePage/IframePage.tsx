import { pmIframe } from '@app/containers/DemoFeatures/Postmessage/postmessage';
import { useTheme } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

export const IframePage: FC = () => {
  const [sections, setSections] = useState<any[]>([]);
  const [draggingId, setDraggingId] = useState<string | undefined>(undefined);

  const theme = useTheme();

  useEffect(() => {
    console.log('init');
    const off1 = pmIframe.on('@sections', data => {
      setSections(data.payload.sections);
    });
    const off2 = pmIframe.on('@draggingId', data => {
      setDraggingId(data.payload);
    });
    const off3 = pmIframe.on('@clicked', data => {
      console.log(data, 123);
      pmIframe.emit('getClickedSuccess', undefined);
    });

    return () => {
      off1();
      off2();
      off3();
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
