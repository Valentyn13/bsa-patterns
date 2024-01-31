/* eslint-disable react/jsx-props-no-spreading */
import type {
  DroppableProvided,
  DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import { Droppable } from '@hello-pangea/dnd';
import React, { CSSProperties } from 'react';

import type { Card } from '../../common/types';
import List from './components/list';
import ListWrapper from './styled/list-wrapper';
import ScrollContainer from './styled/scroll-container';

type Props = {
  listId: string;
  listType: string;
  cards: Card[];
  style: CSSProperties;
};

function CardsList({
  listId, listType, style, cards,
}: Props) {
  return (
    <Droppable droppableId={listId} type={listType}>
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <ListWrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          <ScrollContainer>
            <List listId={listId} cards={cards} dropProvided={dropProvided} />
          </ScrollContainer>
        </ListWrapper>
      )}
    </Droppable>
  );
}

export default CardsList;
