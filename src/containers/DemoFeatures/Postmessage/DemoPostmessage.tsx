import { Button } from '@app/components/Button';
import { MyModal } from '@app/components/Modal';
import Sortable, { SortableProps } from '@app/components/Sortable/Sortable';
import { reorder } from '@app/utils/functions/reorder';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import { pmPopup } from './postmessage';
import { sectionsData } from './sections';

const iframeContainer = document.createElement('div');
iframeContainer.id = 'fake-iframe-container';
iframeContainer.style.cssText = `
  visibility: hidden;
  height: 0;
  overflow: hidden;
`;
document.body.append(iframeContainer);

export const DemoPostmessage = () => {
  const [sections, setSections] = useState(sectionsData);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    pmPopup.emit('@sections', { sections: sections });
  }, [sections]);

  useEffect(() => {
    const post1 = pmPopup.on('getClickedSuccess', () => {
      // iframeContainer.innerHTML = '';
    });

    return () => {
      post1();
    };
  }, []);

  const handleDropEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const sections_ = reorder(sections, result.source.index, result.destination.index);
    setSections(sections_);
    pmPopup.emit('@draggingId', undefined);
  };

  const renderItem: SortableProps<(typeof sectionsData)[0]>['renderItem'] = ({ item, dragHandleProps }) => {
    return (
      <div {...dragHandleProps} key={item.id}>
        {item.label}
      </div>
    );
  };

  const theme = useTheme();
  return (
    <div>
      <h2>Drag and drop with postmessage</h2>
      <div css={{ display: 'flex' }}>
        <div
          css={{
            width: '300px',
            height: '600px',
            padding: '10px',
            backgroundColor: theme.colors.gray2,
          }}
        >
          <Sortable
            data={sections}
            keyExtractor={item => item.id}
            itemCss={{
              marginBottom: '5px',
              backgroundColor: theme.colors.light,
              padding: '10px',
              borderRadius: '4px',
              userSelect: 'none',
              fontFamily: theme.fonts.secondary,
            }}
            renderItem={renderItem}
            onDragEnd={handleDropEnd}
            onDragStart={result => {
              pmPopup.emit('@draggingId', result.draggableId);
            }}
            onDragUpdate={result => {
              pmPopup.emit('@draggingId', result.draggableId);
            }}
          />
        </div>

        <Button
          onClick={() => {
            if (iframeContainer.querySelector('#iframe-section')) {
              pmPopup.emit('@clicked', true);
            } else {
              const iframe = document.createElement('iframe');
              iframe.id = 'iframe-section';
              iframe.src = '/iframe';
              iframe.onload = function () {
                pmPopup.emit('@clicked', true);
              };
              iframeContainer.appendChild(iframe);
            }
          }}
        >
          Click aa
        </Button>
        <Button onClick={() => setVisible(true)}>Open Modal</Button>

        <MyModal isVisible={visible} onCancel={() => setVisible(false)}>
          <iframe id="iframe-section" src="/iframe" css={{ width: '600px' }} title="unique" />
        </MyModal>
      </div>
    </div>
  );
};
