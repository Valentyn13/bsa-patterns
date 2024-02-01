import { IObserver, ILogInputData } from './observer.enum';

export default interface ISubject {
  subscribe(observer:IObserver):void
  unsubscribe(observer:IObserver):void
  notifyObservers(data:ILogInputData):void
}
