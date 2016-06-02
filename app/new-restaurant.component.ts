import { Component, EventEmitter } from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'new-restaurant',
  outputs: ['onSubmitNewRestaurant'],
  template:`
    <div class="restaurant-form">
      <h3>Add a Restaurant</h3>
      <label class="col-sm-6" for="newName">Name</label><input class="col-sm-6 input-lg cd-form" #newName>
      <label class="col-sm-6" for="newSpecialty">Specialty</label><input class="col-sm-6 input-lg cd-form" #newSpecialty>
      <label class="col-sm-6" for="newAddress">Address</label><input class="col-sm-6 input-lg cd-form" #newAddress>
      <label class="col-sm-6" for="newCost">Cost</label><input class="col-sm-6 input-lg cd-form" #newCost>
      <button (click)="addRestaurant(newName, newSpecialty, newAddress, newCost)" class="col-sm-6 btn-success btn-lg add-button addRestaurant">Add</button>
    </div>
  `
})
export class NewRestaurantComponent {
  public onSubmitNewRestaurant: EventEmitter<Restaurant>;
  constructor() {
    this.onSubmitNewRestaurant = new EventEmitter();
  }
  addRestaurant(newName: HTMLInputElement, newSpecialty: HTMLInputElement, newAddress: HTMLInputElement, newCost: HTMLInputElement) {
    if(newName.value.trim() === "") {
        alert("Please give the restaurant a name.");
    } else {
      var restaurant = new Restaurant(newName.value, newSpecialty.value, newAddress.value, newCost.value);
      this.onSubmitNewRestaurant.emit(restaurant);
    }
  }
}
