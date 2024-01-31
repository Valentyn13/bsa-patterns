/* eslint-disable consistent-return */
import { ILogInputData, IObserver } from './observer';

interface ISubject {
  subscribe(observer:IObserver):void
  unsubscribe(observer:IObserver):void
  notifyObservers(data:ILogInputData):void
}

class Subject implements ISubject {
  protected observers: IObserver[] = [];

  subscribe(observer:IObserver): void {
    const isExist = this.observers.find((obs) => obs.id === observer.id);
    if (isExist) {
      return console.error('Observer with this id already exist');
    }
    this.observers.unshift(observer);
    console.log(`Observer with id:${observer.id} successfully added`);
  }

  unsubscribe(observer:IObserver): void {
    const observerIndex = this.observers.findIndex((obs) => obs.id === observer.id);
    if (observerIndex > -1) {
      this.observers.splice(observerIndex, 1);
    } else {
      console.error(`Observer with id:${observer.id} doesn't exist in collection`);
    }
  }

  notifyObservers(data:ILogInputData): void {
    this.observers.forEach((observer) => observer.log(data));
  }
}

export default Subject;
