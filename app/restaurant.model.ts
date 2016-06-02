export class Restaurant {
  public ratings: number[] = [];
  public waitTimes: number[] = [];
  public averageWait: number = 0;
  public averageRating: number = 0;

  constructor(public name: string, public specialty: string, public address: string, public cost: string) {

  }
}
