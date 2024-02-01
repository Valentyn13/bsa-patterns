import { DraggableLocation } from '@hello-pangea/dnd';
import { List, Card } from '../../common/types';
import { cutElementBySrartIndexAndPasteByEndIndex } from './reorder-common.helpers';
import { removeCardFromList, addCardToList } from './reorder-card.helpers';

export const isMoveInSameList = (
  source: DraggableLocation,
  destination: DraggableLocation,
) => source.droppableId === destination.droppableId;

export const moveToAnotherList = (
  lists:List[],
  source:DraggableLocation,
  destination:DraggableLocation,
  current:Card[],
  next:Card[],
  target:Card,
) => {
  const newLists = lists.map((list) => {
    if (list.id === source.droppableId) {
      return {
        ...list,
        cards: removeCardFromList(current, source.index),
      };
    }

    if (list.id === destination.droppableId) {
      return {
        ...list,
        cards: addCardToList(next, destination.index, target),
      };
    }

    return list;
  });

  return newLists;
};

export const moveInSameList = (
  lists: List[],
  source: DraggableLocation,
  destination: DraggableLocation,
  current: Card[],
) => {
  const updatedCards = cutElementBySrartIndexAndPasteByEndIndex<Card>(
    current,
    source.index,
    destination.index,
  );
  const reordered: Card[] = updatedCards;

  return lists.map((list) => (
    list.id === source.droppableId ? { ...list, cards: reordered } : list
  ));
};
