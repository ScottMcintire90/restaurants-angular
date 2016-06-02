import { Component } from 'angular2/core';
import { RestaurantListComponent } from './restaurant-list.component';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'restaurant-review',
  directives: [RestaurantListComponent],
  template: `
    <div class="container">
      <h1 class="jumbotron header">Restaurant Reviews</h1>
        <h2>Restaurants</h2>
        <restaurant-list
          [restaurantList]="restaurants">
        </restaurant-list>
    </div>
  `
})
export class AppComponent {
  public restaurants: Restaurant[];
  constructor() {
    this.restaurants = [
      new Restaurant("McDonalds", "Hamburgers", "Downtown Portland", "$"),
      new Restaurant("Pizza Hut", "Pizza", "Downtown Portland", "$"),
      new Restaurant("Kung Pow", "Chinese", "Downtown Portland", "$$")
    ];
  }
}
