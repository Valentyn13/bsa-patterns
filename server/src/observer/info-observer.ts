/* eslint-disable class-methods-use-this */
import write from '../helpers/file.helpers';
import { ILogInputData } from '../common/enums/observer.enum';
import Observer from './observer';

class InfoLogObserver extends Observer {
  public log(data: ILogInputData): void {
    const message = this.configureLog(data);
    this.writeToFile(message);
  }

  private configureLog(data: ILogInputData) {
    const { initiator, eventType, message } = data;
    const timeStamp = new Date().toISOString();
    const messageLine = `${timeStamp}    initiator:${initiator}    eventType:${eventType}    ${message}\n`;
    return messageLine;
  }

  private writeToFile(message:string) {
    write(this.logPath, message);
  }
}
export default InfoLogObserver;
