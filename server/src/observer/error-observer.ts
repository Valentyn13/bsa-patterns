/* eslint-disable class-methods-use-this */
import { ILogInputData } from '../common/enums/observer.enum';
import write from '../helpers/file.helpers';
import Observer from './observer';

class ErrorLogObserver extends Observer {
  public log(data:ILogInputData): void {
    const message = this.configureLog(data);
    this.writeToFile(message);
    console.error(message);
  }

  private configureLog(data: ILogInputData) {
    const { initiator, eventType, message } = data;
    const timeStamp = new Date().toISOString();
    return `${timeStamp}    ${initiator}    ${eventType}    ${message}`;
  }

  private writeToFile(message:string) {
    write(this.logPath, message);
  }
}

export default ErrorLogObserver;
