/* eslint-disable class-methods-use-this */
import type { Socket } from 'socket.io';

import { CardEvent } from '../common/enums';
import Card from '../data/models/card';
import SocketHandler from './socket.handler';
import List from '../data/models/list';

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.setCardDescription.bind(this));
    socket.on(CardEvent.RENAME, this.setCardName.bind(this));
    socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
    socket.on(CardEvent.DUPLICATE, this.duplicateCard.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, '');
    const lists = this.db.getData();

    const updatedLists = lists.map((list) => (
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list
    ));

    this.db.setData(updatedLists);
    this.updateLists();
    this.notifyObservers({ initiator: 'CardHandler.crateCard', eventType: 'info', message: `Card listId:${listId} cardId:${newCard.id} CREATED` });
  }

  public setCardDescription(listId:string, cardId:string, description:string) {
    const lists = this.db.getData();

    const updatedLists = lists.map((list) => (
      list.id === listId ? this.setCardDescriptionInList(list, cardId, description) : list
    ));

    this.db.setData(updatedLists);
    this.updateLists();
    this.notifyObservers({ initiator: 'CardHandler.setCardDescription', eventType: 'info', message: `Card listId:${listId} cardId:${cardId} CHANGED` });
  }

  public setCardName(listId:string, cardId:string, name:string) {
    const lists = this.db.getData();

    const updatedLists = lists.map((list) => (
      list.id === listId ? this.setCardNameInList(list, cardId, name) : list
    ));

    this.db.setData(updatedLists);
    this.updateLists();
    this.notifyObservers({ initiator: 'CardHandler.setCardName', eventType: 'info', message: `Card listId:${listId} cardId:${cardId} NAME CHANGED` });
  }

  public deleteCard(listId:string, cardId:string) {
    const lists = this.db.getData();
    const updatedLists = lists.map((list) => (
      list.id === listId ? this.deleteCardFromList(list, cardId) : list
    ));

    this.db.setData(updatedLists);
    this.updateLists();
    this.notifyObservers({ initiator: 'CardHandler.deleteCard', eventType: 'info', message: `Card listId:${listId} cardId:${cardId} DELTED` });
  }

  public duplicateCard(listId:string, cardId:string) {
    const lists = this.db.getData();

    const updatedLists = lists.map((list) => (
      list.id === listId ? this.duplicateCardInList(list, cardId) : list
    ));
    this.db.setData(updatedLists);
    this.updateLists();
    this.notifyObservers({ initiator: 'CardHandler.duplicateCard', eventType: 'info', message: `Card listId:${listId} cardId:${cardId} DUPLICATED` });
  }

  private duplicateCardInList(list:List, cardId:string) {
    const index = list.cards.findIndex(((card) => card.id === cardId));
    const duplicat = list.cards[index].clone();
    list.cards.splice(index + 1, 0, duplicat);
    return list;
  }

  private deleteCardFromList(list:List, cardId:string) {
    list.setCards(list.cards.filter((card) => card.id !== cardId));
    return list;
  }

  private setCardDescriptionInList(list:List, cardId:string, description:string) {
    list.cards.map((card) => {
      if (card.id === cardId) {
        card.setDescription(description);
      }
      return card;
    });
    return list;
  }

  private setCardNameInList(list:List, cardId:string, name:string) {
    list.cards.map((card) => {
      if (card.id === cardId) {
        card.setName(name);
      }
      return card;
    });
    return list;
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const lists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();
    this.notifyObservers({ initiator: 'CardHandler.reorderCards', eventType: 'info', message: 'CARDS REORDERED' });
  }
}

export default CardHandler;
