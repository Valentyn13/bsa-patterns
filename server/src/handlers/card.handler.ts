import type { Socket } from 'socket.io';

import { CardEvent } from '../common/enums';
import { Card } from '../data/models/card';
import { SocketHandler } from './socket.handler';
import { List } from '../data/models/list';

export class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION,this.setCardDescription.bind(this) )
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, '');
    const lists = this.db.getData();

    const updatedLists = lists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list,
    );

    this.db.setData(updatedLists);
    this.updateLists();
  }

  public setCardDescription(listId:string,cardId:string, description:string){
    const lists = this.db.getData()

    const updatedLists = lists.map((list) =>
    list.id === listId ? this.setCardDescriptionInList(list, cardId,description) : list,
  );
    
    this.db.setData(updatedLists);
    this.updateLists();
  }

  private setCardDescriptionInList(list:List, cardId:string, description:string){
    list.cards.map((card) =>{
      if(card.id === cardId){
        card.description = description
      }
      return card
    })
    return list
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
  }
}
