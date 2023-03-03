import Sortable, { SortableProps } from '@app/components/Sortable/Sortable';
import { reorder } from '@app/utils/functions/reorder';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import { pmPopup } from './postmessage';
import { sectionsData } from './sections';

export const DemoPostmessage = () => {
  const [sections, setSections] = useState(sectionsData);

  useEffect(() => {
    pmPopup.emit('@sections', { sections: sections });
  }, [sections]);

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

        <iframe id="iframe-section" src="/iframe" css={{ width: '600px' }} title="unique" />
      </div>
    </div>
  );
};
