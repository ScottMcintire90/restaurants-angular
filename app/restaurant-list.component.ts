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
      [restaurant]="currentRestaurant" [restaurantList]="restaurantList"
      (detailsShowing)="editorToggle($event)">
    </restaurant-display>
    <div class="addedit">
      <div class="col-md-6 addRestaurant">
        <new-restaurant (onSubmitNewRestaurant)="createRestaurant($event)">
        </new-restaurant>
      </div>
      <div class="col-md-6 editRestaurant">
      <div *ngIf="selectedRestaurant && editorOpen">
        <edit-restaurant-details [restaurant]="selectedRestaurant">
        </edit-restaurant-details>
        <button (click)="hideEditor()" class="btn btn-success">Done</button>
        </div>
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
  public editorOpen: boolean = true;

  constructor() {
    this.onRestaurantSelect = new EventEmitter();
  }
  createRestaurant(restaurant: Restaurant): void {
    this.restaurantList.push(restaurant);
  }
  restaurantClicked(clickedRestaurant: Restaurant): void {
    this.selectedRestaurant = clickedRestaurant;
    this.onRestaurantSelect.emit(clickedRestaurant);
    this.editorOpen = true;
  }
  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }
  onChange(filterOption) {
    this.filterSpecialty = filterOption;
  }
  editorToggle(detailsShowing: boolean) {
    if(detailsShowing) {
      this.editorOpen = true;
    } else {
      this.editorOpen = false;
    }
  }
  hideEditor(){
    this.editorOpen = false;
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
