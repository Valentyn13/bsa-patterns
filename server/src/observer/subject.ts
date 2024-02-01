import { ILogInputData, IObserver } from '../common/enums/observer.enum';
import ISubject from '../common/enums/subject.enum';

class Publisher implements ISubject {
  protected observers: IObserver[] = [];

  subscribe(observer:IObserver): void {
    const isExist = this.observers.find((obs) => obs.id === observer.id);
    if (isExist) {
      console.error('Observer with this id already exist');
    } else {
      this.observers.unshift(observer);
      console.log(`Observer with id:${observer.id} successfully added`);
    }
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
    const { eventType } = data;
    const matchedObservers = this.observers.filter((obs) => obs.level === eventType);
    matchedObservers.forEach((observer) => observer.log(data));
  }
}

export default Publisher;
