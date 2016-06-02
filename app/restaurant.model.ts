export class Restaurant {
  public ratings: number[] = [];
  public waitTimes: number[] = [];
  constructor(public name: string, public specialty: string, public address: string, public cost: string) {

  }
}
