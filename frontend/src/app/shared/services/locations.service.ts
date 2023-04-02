import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { getDatabase, ref, set, onValue} from "firebase/database";
import { ref as _storageRef} from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  cityLocation = "";
  locations: Object[] = [];
  locationsSubject = new Subject<Object[]>();

  constructor() { }

  //? ------------------------------------- ?//
  //? START LOCATION PART
  //? ------------------------------------- ?//

  getActualLocation() {
    const db = getDatabase();
    const path = ref(db, "locations/" + this.cityLocation);
    onValue(path, (data) => {
      this.locations = data.val() ? data.val() : [];
    });
  }

  getAllLocations() {
    const db = getDatabase();
    const path = ref(db, "locations/");
    onValue(path, (data) => {
      const dbVal = data.val() ? data.val() : [];
      this.locations = Object.keys(dbVal)
      this.emitLocations();
    });
  }
  
  createLocation(newLocation: Object) {
    this.locations.push(newLocation);
    this.saveLocation();
    this.emitLocations();
  }

  saveLocation() {
    const db = getDatabase();
    set(ref(db, "locations/" + this.cityLocation), this.cityLocation);
  }

  emitLocations() {
    this.locationsSubject.next(this.locations);
  }

  removeLocation(locationObj: Object) {
    const locationIndex = this.locations.findIndex((locationElement) => {
      if(locationElement === locationObj) {
        return true;
      } else {
        return false;
      }
    })
    this.locations.splice(locationIndex, 1);
    this.saveLocation();
    this.emitLocations();
  }
}
