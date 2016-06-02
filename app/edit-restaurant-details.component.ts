import { Component } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'edit-restaurant-details',
  inputs: ['restaurant'],
  template:`
  <h3>Edit Restaurant Details</h3>
  <div class="restaurant-form">
    <label class="col-sm-6" for="restaurantName">Name</label><input class="col-sm-6 input-lg cd-form" [(ngModel)]="restaurant.name">
    <label class="col-sm-6" for="restaurantSpecialty">Specialty</label><input class="col-sm-6 input-lg cd-form" [(ngModel)]="restaurant.specialty">
    <label class="col-sm-6" for="restaurantAddress">Address</label><input class="col-sm-6 input-lg cd-form" [(ngModel)]="restaurant.address">
    <label class="col-sm-6" for="restaurantCost">Cost</label><input class="col-sm-6 input-lg cd-form" [(ngModel)]="restaurant.cost">
    
  </div>
  `
})
export class EditRestaurantDetailsComponent {
  public restaurant: Restaurant;
}
