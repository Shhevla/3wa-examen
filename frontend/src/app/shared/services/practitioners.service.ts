import { Injectable } from '@angular/core';
import { Practitioners } from '../models/practitioner.model';
import { Subject } from 'rxjs';
import { getDatabase, ref, set, onValue} from "firebase/database";
import { MembersService } from './members.service';
import { CallApiService } from './call-api.service';
import { CabinetService } from './cabinet.service';

@Injectable({
  providedIn: 'root'
})
export class PractitionersService {

  constructor(private memberService :MembersService, private callApiService: CallApiService, private cabinetService: CabinetService) { }

  practitioners :Practitioners[] = [];

  practitionersSubject = new Subject<Practitioners[]>();

  
  emitPractitioners() {
    this.practitionersSubject.next(this.practitioners);
  }
  
  savePractitioner() {
    //! get cabinet id / profile id / path !//
    // let cabinet = this.cabinetService.getSaveCabinet()
    // let id = this.cabinetService.getId();
    // let path = this.cabinetService.getPath();
    // this.cabinetOptions
    // this.callApiService.inviteWorker(cabinet ,path, path,);
  }
  
  createPractitioner(practitioner:Practitioners) {
    this.practitioners.push(practitioner);
    this.savePractitioner();
    this.emitPractitioners();
  }

  removePractitioner(practitioner :Practitioners) {
    const practitionerIndex = this.practitioners.findIndex((practitionersElement) => {
      if(practitionersElement === practitioner) {
        return true;
      } else {
        return false;
      }
    })
    this.practitioners.splice(practitionerIndex, 1);
    this.savePractitioner();
    this.emitPractitioners();
  }

  getPractitioners() {
    const db = getDatabase();
    const path = ref(db, "locations/" + this.memberService.cityLocation + "/practitioners/");
    onValue(path, (data) => {
      this.practitioners = data.val() ? data.val() : [];
      this.emitPractitioners();
    });
  }

  getPractitionersWithId(id: string) {
    const db = getDatabase();
    const path = ref(db, "locations/" + id + "/practitioners/");
    onValue(path, (data) => {
      this.practitioners = data.val() ? data.val() : [];
      this.emitPractitioners();
    });
  }

  getSpecificLocationPractitioner(location:string) {
    const db = getDatabase();
    const path = ref(db, "locations/" + location + "/practitioners/");
    onValue(path, (data) => {
      this.practitioners = data.val() ? data.val() : [];
      this.emitPractitioners();
    });
  }


  updatePractitioner(index:number, newPractitioner:Practitioners) {
    this.practitioners[index] = newPractitioner;
    this.savePractitioner();
    this.emitPractitioners();
  }
}
