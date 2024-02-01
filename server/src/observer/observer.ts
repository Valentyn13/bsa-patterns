/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { randomUUID } from 'crypto';
import { Events, ILogInputData, IObserver } from '../common/enums/observer.enum';

class Observer implements IObserver {
  id: string;

  logPath:string;

  level: Events;

  constructor(level:Events, logPath:string) {
    this.id = randomUUID();
    this.level = level;
    this.logPath = logPath;
  }

  log(data: ILogInputData): void {}
}

export default Observer;
