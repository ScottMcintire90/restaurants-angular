import { Component, EventEmitter } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'restaurant-display',
  inputs: ['restaurant', 'restaurantList'],
  outputs: ['detailsShowing'],
  template: `
    <h3 (click)="restaurantClicked()">{{ restaurant.name }}</h3>
    <div *ngIf="showDetails">
      <ul class="restaurantDetails">
        <p><strong>Specialty: </strong>{{ restaurant.specialty }}</p>
        <p><strong>Address: </strong>{{ restaurant.address }}</p>
        <p><strong>Cost: </strong>{{ restaurant.cost }}</p>
        <p><strong>Average Rating: </strong>{{restaurant.averageRating}}</p>
        <p><strong>Average Wait Time: </strong>{{restaurant.averageWait}}</p>
      </ul>
      <label for="waitTime">Wait Time</label>
      <input placeholder="Minutes" type="number" #newWaitTime>
      <button (click)="addWaitTime(newWaitTime.value)" class="btn btn-info">Add Wait Time</button>
      <div class="rating">
        <label for="rating">Rating</label>
        <select #newRating>
          <option value=5>5</option>
          <option value=4>4</option>
          <option value=3>3</option>
          <option value=2>2</option>
          <option value=1>1</option>
        </select>
        <button (click)="addRating(newRating.value)" class="btn btn-info">Add Rating</button>
      </div>
    </div>
  `
})
export class RestaurantComponent {
  public restaurant: Restaurant;
  public restaurantList: Restaurant[];
  public showDetails: boolean = false;
  public detailsShowing: EventEmitter<boolean>;

  constructor() {
    this.detailsShowing = new EventEmitter();
  }

  restaurantClicked(): void {
    if(this.showDetails === true) {
      this.showDetails = false;
    } else {
      this.showDetails = true;
    }
    this.detailsShowing.emit(this.showDetails);
  }
  addRating(rating: number): void {
    var totalRatings: number = 0;
    totalRatings = this.restaurant.averageRating * this.restaurant.ratings.length;
    totalRatings += Number(rating);
    this.restaurant.ratings.push(rating);
    this.restaurant.averageRating = totalRatings/this.restaurant.ratings.length;
  }
  addWaitTime(waitTime: number): void {
    var totalWaitTimes: number= 0;
    totalWaitTimes = this.restaurant.averageWait * this.restaurant.waitTimes.length;
    totalWaitTimes += Number(waitTime);
    this.restaurant.waitTimes.push(waitTime);
    this.restaurant.averageWait = totalWaitTimes/this.restaurant.waitTimes.length;
  }

}
