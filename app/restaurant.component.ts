import { Component } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'restaurant-display',
  inputs: ['restaurant', 'restaurantList'],
  template: `
    <h3 (click)="restaurantClicked()">{{ restaurant.name }}</h3>
    <div *ngIf="selectedRestaurant">
      <ul class="restaurantDetails">
        <p><strong>Specialty: </strong>{{ restaurant.specialty }}</p>
        <p><strong>Address: </strong>{{ restaurant.address }}</p>
        <p><strong>Cost: </strong>{{ restaurant.cost }}</p>
      </ul>
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
  `
})
export class RestaurantComponent {
  public restaurant: Restaurant;
  public restaurantList: Restaurant[];
  public selectedRestaurant: boolean = false;

  restaurantClicked(): void {
    if(this.selectedRestaurant === true) {
      this.selectedRestaurant = false;
    } else {
      this.selectedRestaurant = true;
    }
  }
  addRating(rating: number): void {
    this.restaurant.ratings.push(rating);
    console.log(this.restaurant.ratings);
  }
}
