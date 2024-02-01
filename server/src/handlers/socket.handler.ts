import { Server, Socket } from 'socket.io';

import { ListEvent } from '../common/enums';
import Database from '../data/database';
import ReorderService from '../services/reorder.service';
import Publisher from '../observer/subject';

abstract class SocketHandler extends Publisher {
  protected db: Database;

  protected reorderService: ReorderService;

  protected io: Server;

  public constructor(io: Server, db: Database, reorderService: ReorderService) {
    super();
    this.io = io;
    this.db = db;
    this.reorderService = reorderService;
  }

  public abstract handleConnection(socket: Socket): void;

  protected updateLists(): void {
    this.io.emit(ListEvent.UPDATE, this.db.getData());
  }
}

export default SocketHandler;
