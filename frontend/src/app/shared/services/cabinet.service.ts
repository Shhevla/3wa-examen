import { Injectable } from '@angular/core';
import { Cabinet } from '../models/cabinet.model';

@Injectable({
  providedIn: 'root'
})
export class CabinetService {
  Cabinet : Cabinet | undefined;
  id : String = "";
  path: String = "";
  name: String = "";
  constructor() { }

  saveCabinet(cabinetToSave: Cabinet, id :String, path: String) {
    this.Cabinet = cabinetToSave;
    this.id = id;
    this.path = path;
}

  saveName(name :String) {
    if(name != undefined)
        this.name = name;
}

  getname() {
    return(this.name);
}
  getSaveCabinet() {
    return(this.Cabinet);
  }
  
  getId() {
    return(this.id);
  }

  getPath() {
    return(this.path);
  }
}
