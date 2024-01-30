import { DroppableProvided } from '@hello-pangea/dnd';

import { Card } from '../../../common/types';
import { DropZone } from '../styled/drop-zone';
import { Cards } from './cards';

type Props = {
  dropProvided: DroppableProvided;
  cards: Card[];
  listId: string;
};

const List = ({ listId, cards, dropProvided }: Props) => {
  return (
    <div className="list-container">
      <DropZone ref={dropProvided.innerRef}>
        <Cards listId={listId} cards={cards} />
        {dropProvided.placeholder}
      </DropZone>
    </div>
  );
};

export { List };
