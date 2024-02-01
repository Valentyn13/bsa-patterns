import { randomUUID } from 'crypto';
import write from '../helpers/file.helpers';
import { ILogInputData, IObserver } from '../common/enums/observer.enum';

class FileObserver implements IObserver {
  id:string;

  private message:string = '';

  private fileName:string;

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
    this.message = `${timeStamp}    initiator:${initiator}    eventType:${eventType}    ${message}\n`;
    return this.message;
  }

  private writeToFile(message:string) {
    write(this.fileName, message);
  }
}
export default FileObserver;
