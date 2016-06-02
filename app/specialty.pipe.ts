import {Pipe, PipeTransform} from 'angular2/core';
import { Restaurant } from './restaurant.model';

@Pipe({
  name: "specialtySelect",
  pure: false
})
export class SpecialtyPipe implements PipeTransform {
  transform(input: Restaurant[], args) {
    var desiredSpecialty = args[0];
    if (desiredSpecialty === "all") {
      return input;
    } else {
      return input.filter(function(restaurant) {
        return restaurant.specialty === desiredSpecialty;
      });
    }
  }
}
