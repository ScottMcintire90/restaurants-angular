import { Component, EventEmitter } from 'angular2/core';
import { RestaurantComponent } from './restaurant.component';
import { NewRestaurantComponent } from './new-restaurant.component';
import { Restaurant } from './restaurant.model';
import { EditRestaurantDetailsComponent } from './edit-restaurant-details.component';
import { SpecialtyPipe } from './specialty.pipe';

@Component({
  selector: 'restaurant-list',
  inputs: ['restaurantList'],
  pipes: [SpecialtyPipe],
  directives: [RestaurantComponent, NewRestaurantComponent, EditRestaurantDetailsComponent],
  template:`
    <label>Filter by Specialty</label>
    <select (change)="onChange($event.target.value)" class="filter">
      <option value="all">All Specialties</option>
      <option *ngFor="#specialty of specialties" [value]="specialty">{{specialty}}</option>
    </select>
    <restaurant-display *ngFor="#currentRestaurant of restaurantList | specialtySelect:filterSpecialty"
      (click)="restaurantClicked(currentRestaurant)"
      [class.selected]="currentRestaurant === selectedRestaurant"
      [restaurant]="currentRestaurant" [restaurantList]="restaurantList">
    </restaurant-display>
    <div class="addedit">
      <div class="col-md-6 addRestaurant">
        <new-restaurant (onSubmitNewRestaurant)="createRestaurant($event)">
        </new-restaurant>
      </div>
      <div class="col-md-6 editRestaurant">
        <edit-restaurant-details *ngIf="selectedRestaurant" [restaurant]="selectedRestaurant">
        </edit-restaurant-details>
      </div>
    </div>
  `
})
export class RestaurantListComponent {
  public restaurantList: Restaurant[];
  public onRestaurantSelect: EventEmitter<Restaurant>;
  public selectedRestaurant: Restaurant;
  public specialties = [];
  public filterSpecialty: string = "all";

  constructor() {
    this.onRestaurantSelect = new EventEmitter();
  }
  createRestaurant(restaurant: Restaurant): void {
    this.restaurantList.push(restaurant);
  }
  restaurantClicked(clickedRestaurant: Restaurant): void {
    this.selectedRestaurant = clickedRestaurant;
    this.onRestaurantSelect.emit(clickedRestaurant);
  }
  isInArray(value, array) {
    return array.indexOf(value) >- 1;
  }
  onChange(filterOption) {
    this.filterSpecialty = filterOption;
  }
  getSpecialties(): void {
    for(var i=0; i<this.restaurantList.length; i++) {
      if(!this.isInArray(this.restaurantList[i].specialty, this.specialties)) {
        this.specialties.push(this.restaurantList[i].specialty)
      }
    }
  }


  public ngOnInit(): any {
    this.getSpecialties();
  }
}
