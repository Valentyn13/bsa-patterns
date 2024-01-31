import { List } from "../data/models/list";
import { ReorderService } from "../services/reorder.service";

class ProxyReorderLogger extends ReorderService {
  reorderService: ReorderService;
  constructor(reorderService: ReorderService) {
    super();
    this.reorderService = reorderService;
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
    console.log('Logg reorder 1')
    return this.reorderService.reorderCards({
        lists,
        sourceIndex,
        destinationIndex,
        sourceListId,
        destinationListId,
      })
  }

   public reorder<T>(items: T[], startIndex: number, endIndex: number): T[] {
      console.log('Logg reorder 2')
      return this.reorderService.reorder(items, startIndex, endIndex)
  }
}

export {ProxyReorderLogger}
