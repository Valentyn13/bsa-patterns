import { DraggableLocation } from '@hello-pangea/dnd';
import { Card, List } from '../../common/types';

export const removeCardFromList = (
  cards: Card[],
  index: number,
): Card[] => cards.slice(0, index).concat(cards.slice(index + 1));

export const addCardToList = (
  cards: Card[],
  index: number,
  card: Card,
): Card[] => cards.slice(0, index).concat(card).concat(cards.slice(index));

export const findDraggableCardsById = (lists: List[], param: DraggableLocation) => (
  lists.find((list) => list.id === param.droppableId)?.cards || []
);
