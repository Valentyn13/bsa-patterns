/* eslint-disable class-methods-use-this */
import { randomUUID } from 'crypto';
import write from '../helpers/file.helpers';

export type Events = 'info' | 'warning' | 'error';

export interface ILogInputData {
  initiator:string,
  eventType:Events,
  message:string,
}

export interface IObserver {
  id:string
  log(data: ILogInputData):void
}

class FileObserver implements IObserver {
  id:string;

  fileName:string;

  constructor(fileName:string) {
    this.id = randomUUID();
    this.fileName = fileName;
  }

  public log(data: ILogInputData): void {
    const message = this.configureLog(data);
    this.writeToFile(message);
  }

  private configureLog(data: ILogInputData) {
    const { initiator, eventType, message } = data;
    const timeStamp = new Date().toISOString();
    return `${timeStamp}    initiator:${initiator}    eventType:${eventType}    ${message}\n`;
  }

  private writeToFile(message:string) {
    write(this.fileName, message);
  }
}
export { FileObserver };
