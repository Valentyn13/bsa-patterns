export type Events = 'info' | 'warning' | 'error';

export interface ILogInputData {
  initiator:string,
  eventType:Events,
  message:string,
}

export interface IObserver {
  id:string;
  level:Events;
  log(data: ILogInputData):void
}
