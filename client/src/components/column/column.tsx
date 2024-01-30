import { colors } from '@atlaskit/theme';
import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from '@hello-pangea/dnd';
import { Draggable } from '@hello-pangea/dnd';

import type { Card } from '../../common/types';
import { CardsList } from '../card-list/card-list';
import { DeleteButton } from '../primitives/delete-button';
import { Splitter } from '../primitives/styled/splitter';
import { Title } from '../primitives/title';
import { Footer } from './components/footer';
import { Container } from './styled/container';
import { Header } from './styled/header';
import { useContext } from 'react';
import { SocketContext } from '../../context/socket';
import { CardEvent, ListEvent } from '../../common/enums';

type Props = {
  listId: string;
  listName: string;
  cards: Card[];
  index: number;
};

export const Column = ({ listId, listName, cards, index }: Props) => {
  const socket = useContext(SocketContext)

  const handleCreateCard = (name:string) => {
    console.log(`List id:${listId}, card name:${name}`)
    socket.emit(CardEvent.CREATE,listId,name)
  }

  const handleDeleteList = () => {
    socket.emit(ListEvent.DELETE, listId)
  }

  const handleListTitleChange = (title:string) => {
    socket.emit(ListEvent.RENAME, listId, title)
  }
  return (
    <Draggable draggableId={listId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container className="column-container" ref={provided.innerRef} {...provided.draggableProps}>
          <Header
            className="column-header"
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <Title
              aria-label={listName}
              title={listName}
              onChange={handleListTitleChange}
              fontSize="large"
              width={200}
              isBold
            />
            <Splitter />
            <DeleteButton color="#FFF0" onClick={handleDeleteList} />
          </Header>
          <CardsList
            listId={listId}
            listType="CARD"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : '',
            }}
            cards={cards}
          />
          <Footer onCreateCard={handleCreateCard} />
        </Container>
      )}
    </Draggable>
  );
};
