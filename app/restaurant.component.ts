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
        <p><strong>Average Rating: </strong>{{restaurant.averageRating}}</p>
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
    var totalRatings: number = 0;
    totalRatings = this.restaurant.averageRating * this.restaurant.ratings.length;
    console.log("Total Ratings1", totalRatings);
    totalRatings += Number(rating);
    console.log("This average rating", this.restaurant.averageRating);
    console.log("This restaurant ratings length", this.restaurant.ratings.length);
    this.restaurant.ratings.push(rating);
    console.log("Total Ratings", totalRatings);
    this.restaurant.averageRating = totalRatings/this.restaurant.ratings.length;

  }

}
