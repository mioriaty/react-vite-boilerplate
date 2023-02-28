import { Interpolation, Theme } from '@emotion/react';
import { ReactNode } from 'react';
import { DragDropContext, DragDropContextProps, Draggable, DraggableProvidedDragHandleProps, Droppable } from 'react-beautiful-dnd';

interface DataDefault {
  id: string;
}

export interface RenderItemParam<T extends DataDefault> {
  item: T;
  index: number;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  isDragging: boolean;
}

export interface SortableProps<T extends DataDefault> extends Omit<DragDropContextProps, 'children'> {
  data: T[];
  renderItem: ({ item, index, dragHandleProps }: RenderItemParam<T>) => ReactNode;
  keyExtractor?: (item: T) => string;
  itemCss?: Interpolation<Theme>;
  containerCss?: Interpolation<Theme>;
  droppableId?: string;
  type?: string;
}

const Sortable = <T extends { id: string }>({
  data,
  renderItem,
  keyExtractor = item => item.id,
  itemCss,
  containerCss,
  droppableId = 'droppable',
  type,
  ...rest
}: SortableProps<T>) => {
  return (
    <DragDropContext {...rest}>
      <Droppable type={type} droppableId={droppableId}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} css={containerCss}>
            {data.map((item, index) => (
              <Draggable key={keyExtractor(item)} draggableId={item.id} index={index}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      style={{
                        ...provided.draggableProps.style,
                        ...(provided.draggableProps.style?.transform
                          ? {
                              transform: `${provided.draggableProps.style?.transform?.replace(/\(.*,/g, '(0,')}`,
                            }
                          : {}),
                      }}
                      css={itemCss}
                    >
                      {renderItem({
                        item,
                        index,
                        dragHandleProps: provided.dragHandleProps ? provided.dragHandleProps : undefined,
                        isDragging: snapshot.isDragging,
                      })}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Sortable;
