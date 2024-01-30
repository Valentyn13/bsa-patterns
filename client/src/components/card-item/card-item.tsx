import type { DraggableProvided } from '@hello-pangea/dnd';

import type { Card } from '../../common/types';
import { CopyButton } from '../primitives/copy-button';
import { DeleteButton } from '../primitives/delete-button';
import { Splitter } from '../primitives/styled/splitter';
import { Text } from '../primitives/text';
import { Title } from '../primitives/title';
import { Container } from './styled/container';
import { Content } from './styled/content';
import { Footer } from './styled/footer';
import { useContext } from 'react';
import { SocketContext } from '../../context/socket';
import { CardEvent } from '../../common/enums';

type Props = {
  card: Card;
  listId: string;
  isDragging: boolean;
  provided: DraggableProvided;
};

export const CardItem = ({ listId,card, isDragging, provided }: Props) => {
  const socket = useContext(SocketContext)

  const handleCardDescriptionChange = (description:string) =>{
    socket.emit(CardEvent.CHANGE_DESCRIPTION,listId,card.id, description)
  }

  const handleTitleChange = (title:string) =>{
    socket.emit(CardEvent.RENAME,listId, card.id,title)
  }

  const handleDeleteCard = () =>{
    socket.emit(CardEvent.DELETE,listId,card.id)
  }

  const handleDuplicateCard = ()=>{
    socket.emit(CardEvent.DUPLICATE,listId, card.id)
  }

  return (
    <Container
      className="card-container"
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={card.id}
      aria-label={card.name}
    >
      <Content>
        <Title
          onChange={handleTitleChange}
          title={card.name}
          fontSize="large"
          isBold
        />
        <Text text={card.description} onChange={handleCardDescriptionChange} />
        <Footer>
          <DeleteButton onClick={handleDeleteCard} />
          <Splitter />
          <CopyButton onClick={handleDuplicateCard} />
        </Footer>
      </Content>
    </Container>
  );
};
