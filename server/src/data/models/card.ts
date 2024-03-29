import { randomUUID } from 'crypto';

class Card {
  public id: string;

  public name: string;

  public description: string;

  public createdAt: Date;

  public constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.id = randomUUID();
  }

  setDescription(desc:string) {
    this.description = desc;
  }

  setName(name:string) {
    this.name = name;
  }

  public clone() {
    return new Card(this.name, this.description);
  }
}

export default Card;
