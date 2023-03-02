import { AutocompleteInput } from '@app/components/AutocompleteInput';
import { Button } from '@app/components/Button';
import { MyModal, MyModalProps } from '@app/components/Modal';
import Sortable, { SortableProps } from '@app/components/Sortable/Sortable';
import { sectionsData } from '@app/sections';
import { reorder } from '@app/utils/functions/reorder';
import { useTheme } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';

import { BlockingUI } from './Map/BlockingUI';
import { WithUseWorker } from './Map/WithUseWorker';
import { pmPopup } from './postmessage';

export const HomePage: FC = () => {
  const theme = useTheme();
  const [sections, setSections] = useState(sectionsData);
  const [tab, setTab] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalSize, setModalSize] = useState<MyModalProps['size']>('small');

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

  return (
    <div css={{ padding: '10px' }}>
      <h2>Demo autocomplete input</h2>
      <AutocompleteInput data={['Toán', 'Lí', 'Hóa', 'Sinh', 'Sử', 'Địa']} onSelect={console.log} />
      <hr />
      <hr />
      <h2>Demo modal</h2>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Open modal
      </Button>
      <MyModal
        size={modalSize}
        isVisible={visible}
        headerText="header ne"
        onCancel={() => {
          setVisible(false);
          setModalSize('small');
        }}
        onOk={() => {
          setVisible(false);
          setModalSize('small');
        }}
      >
        Change modal size
        <br />
        <Button onClick={() => setModalSize('small')}>Small</Button>
        <Button onClick={() => setModalSize('medium')}>Medium</Button>
        <Button onClick={() => setModalSize('large')}>Large</Button>
      </MyModal>
      <hr />
      <hr />
      <h2>Demo fetch with web worker</h2>
      <ul>
        <li
          role={'button'}
          css={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => {
            setTab('with-worker');
          }}
        >
          With useWorker
        </li>
        <li
          css={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => {
            setTab('blocking-ui');
          }}
        >
          Blocking UI
        </li>
      </ul>
      <div css={{ width: '400px' }}>{tab === 'with-worker' ? <WithUseWorker /> : tab === 'blocking-ui' ? <BlockingUI /> : null}</div>
      <hr />
      <hr />
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
