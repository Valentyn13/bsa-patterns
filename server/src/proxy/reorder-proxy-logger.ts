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

  private createLog(props:ConfigureLogData) {
    let message = '';
    const TAB = '   ';
    const timeStamp = new Date().toISOString();
    message += timeStamp + TAB;
    Object.entries(props).forEach((propAndValue) => {
      message += `${propAndValue[0]}:${propAndValue[1]}${TAB}`;
    });
    message += 'REORDER \n';
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
    this.createLog({
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
    this.createLog({
      initiator: 'ReorderService.reorder', eventType: 'info', startIndex, endIndex,
    });
    return this.reorderService.reorder(items, startIndex, endIndex);
  }
}

export default ProxyReorderLogger;
