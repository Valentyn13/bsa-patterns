/* eslint-disable class-methods-use-this */
import { randomUUID } from 'crypto';
import { ILogInputData, IObserver } from '../common/enums/observer.enum';

class ConsoleObserver implements IObserver {
  id:string;

  constructor() {
    this.id = randomUUID();
  }

  public log(data:ILogInputData): void {
    const log = this.configureLog(data);
    console.log(log);
  }

  private configureLog(data: ILogInputData) {
    const { initiator, eventType, message } = data;
    const timeStamp = new Date().toISOString();
    return `${timeStamp}    ${initiator}    ${eventType}    ${message}`;
  }
}

export default ConsoleObserver;
