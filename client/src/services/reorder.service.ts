import type { DraggableLocation } from '@hello-pangea/dnd';

import { Card, List } from '../common/types';
import {
  cutElementBySrartIndexAndPasteByEndIndex,
} from '../helpers/reorder/reorder-common.helpers';
import { isMoveInSameList, moveInSameList, moveToAnotherList } from '../helpers/reorder/reorder-move.helpers';
import { findDraggableCardsById } from '../helpers/reorder/reorder-card.helpers';

const reorderService = {
  reorderLists(items: List[], startIndex: number, endIndex: number): List[] {
    const updatedList = cutElementBySrartIndexAndPasteByEndIndex<List>(items, startIndex, endIndex);
    return updatedList;
  },

  reorderCards(
    lists: List[],
    source: DraggableLocation,
    destination: DraggableLocation,
  ): List[] {
    const current: Card[] = findDraggableCardsById(lists, source);
    const next: Card[] = findDraggableCardsById(lists, destination);

    const target: Card = current[source.index];

    const isMovingInSameList = isMoveInSameList(source, destination);

    if (isMovingInSameList) {
      return moveInSameList(lists, source, destination, current);
    }
    return moveToAnotherList(lists, source, destination, current, next, target);
  },
};

export default reorderService;
