import type { Socket } from 'socket.io';

import { ListEvent } from '../common/enums';
import List from '../data/models/list';
import SocketHandler from './socket.handler';
import isStringEmpty from '../helpers/validation.helpers';

class ListHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(ListEvent.CREATE, this.createList.bind(this));
    socket.on(ListEvent.GET, this.getLists.bind(this));
    socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
    socket.on(ListEvent.DELETE, this.deleteList.bind(this));
    socket.on(ListEvent.RENAME, this.setListTitle.bind(this));
  }

  private getLists(callback: (cards: List[]) => void): void {
    callback(this.db.getData());
  }

  private reorderLists(sourceIndex: number, destinationIndex: number): void {
    const lists = this.db.getData();
    const reorderedLists = this.reorderService.reorder(
      lists,
      sourceIndex,
      destinationIndex,
    );
    this.db.setData(reorderedLists);
    this.updateLists();
    this.notifyObservers({
      initiator: 'ListHandler.reorderList',
      eventType: 'info',
      message: 'Lists REORDERED',
    });
  }

  private setListTitle(listId:string, title:string) {
    try {
      if (isStringEmpty(title)) {
        throw new Error('Emply list name is not allowed');
      }
      const lists = this.db.getData();
      const newList = lists.map((list) => (
        list.id === listId ? list.setName(title) : list
      ));
      this.db.setData(newList);
      this.updateLists();
      this.notifyObservers({
        initiator: 'ListHandler.setListTitle',
        eventType: 'info',
        message: `List id:${listId}  TITLE CHANGED`,
      });
    } catch (error) {
      this.notifyObservers({
        initiator: 'ListHandler.setListTitle',
        eventType: 'error',
        message: `ERROR MESSAGE=${error.message}\n`,
      });
    }
  }

  private deleteList(listId:string) {
    const lists = this.db.getData();
    const newList = lists.filter((list) => list.id !== listId);

    this.db.setData(newList);
    this.updateLists();
    this.notifyObservers({
      initiator: 'ListHandler.deleteList',
      eventType: 'info',
      message: `List id:${listId} DELETED`,
    });
  }

  private createList(name: string): void {
    try {
      if (isStringEmpty(name)) {
        throw new Error('Emply list name is not allowed');
      }
      const lists = this.db.getData();
      const newList = new List(name);
      this.db.setData(lists.concat(newList));
      this.updateLists();
      this.notifyObservers({
        initiator: 'ListHandler.createList',
        eventType: 'info',
        message: `List id:${newList.id} CREATED`,
      });
    } catch (error) {
      this.notifyObservers({
        initiator: 'ListHandler.createList',
        eventType: 'error',
        message: `ERROR MESSAGE=${error.message}\n`,
      });
    }
  }
}

export default ListHandler;
