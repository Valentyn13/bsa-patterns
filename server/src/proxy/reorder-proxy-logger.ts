import { Events } from '../common/enums/observer.enum';
import List from '../data/models/list';
import write from '../helpers/file.helpers';
import ReorderService from '../services/reorder.service';

type ConfigureLogData = {
  initiator:string;
  eventType:Events
  sourceIndex: number;
  destinationIndex: number;
  sourceListId: string;
  destinationListId: string;
} | {
  initiator:string;
  eventType:Events;
  startIndex: number;
  endIndex: number;
};

class ProxyReorderLogger extends ReorderService {
  reorderService: ReorderService;

  filePath:string;

  constructor(reorderService: ReorderService, filePath) {
    super();
    this.reorderService = reorderService;
    this.filePath = filePath;
  }

  private configureLog(props:ConfigureLogData) {
    let message = '';
    const TAB = '   ';
    const timeStamp = new Date().toISOString();
    message += timeStamp + TAB;
    for (const prop in props) {
      message += `${prop}:${props[prop]}${TAB}`;
    }
    message += 'REORDER \n';
    console.log(message);
    write(this.filePath, message);
  }

  public reorderCards({
    lists,
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    lists: List[];
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): List[] {
    this.configureLog({
      initiator: 'ReorderService.reorderCards', eventType: 'info', sourceIndex, destinationIndex, sourceListId, destinationListId,
    });
    return this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
  }

  public reorder<T>(items: T[], startIndex: number, endIndex: number): T[] {
    this.configureLog({
      initiator: 'ReorderService.reorder', eventType: 'info', startIndex, endIndex,
    });
    return this.reorderService.reorder(items, startIndex, endIndex);
  }
}

export default ProxyReorderLogger;
