import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Member } from '../models/member.model';
import { Documents } from '../models/documents.model';
import { getDatabase, ref, set, onValue} from "firebase/database";
import { deleteObject, getDownloadURL, getStorage, listAll, ref as _storageRef, StorageReference, uploadBytesResumable } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  cityLocation = "";

  members: Member[] = [];
  documents: Documents[] = [];

  membersSubject = new Subject<Member[]>();
  documentsSubject = new Subject<Documents[]>();

  constructor() { }

  //? ------------------------------------- ?//
  //? START MEMBERS PART
  //? ------------------------------------- ?//

  emitMembers() {
    this.membersSubject.next(this.members);
  }

  saveMembers() {
    const db = getDatabase();
    set(ref(db, "locations/" + this.cityLocation + "/members/"), this.members)
  }

  getMembers() {
    const db = getDatabase();
    const path = ref(db, "locations/" + this.cityLocation + "/members/");
    onValue(path, (data) => {
      this.members = data.val() ? data.val() : [];
      this.sortByName(this.members);
      this.emitMembers();
    });
  }

  getOneMember(id: number): Object{
    const db = getDatabase();
    const path = ref(db, "locations/" + this.cityLocation + "/members/" + id);

    return new Promise(resolve => {
      onValue(path, (data) => {
        var test = data.val();
        resolve(test);
      }, {
        onlyOnce: true
      });
  });
}

  createNewMember(newMember: Member) {
    this.members.push(newMember);
    this.saveMembers();
    this.emitMembers();
  }

  removeMember(member: Member) {
    const memberIndex = this.members.findIndex((memberElement) => {
      if(memberElement === member) {
        return true;
      } else {
        return false;
      }
    })
    this.members.splice(memberIndex, 1);
    this.saveMembers();
    this.emitMembers();
  }

  // ARCHIVES PART

  //! FILE PART //
  
  

  // Sort members

  sortByName(members: Member[]) {
    if (members.length > 0) {
        members.sort((a, b) => {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                return -1;
            }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                return 1;
            }
            return 0;
        });
    }
  }

  sortByInvoice(members: Member[]) {
    members.sort((a, b) => {
      if (a.invoice < b.invoice) {
        return -1;
      }
      if (a.invoice > b.invoice) {
        return 1;
      }
      return 0;
    });
    members.sort((a, b) => {
      if (a.invoice[0] === -1 && b.invoice[0] !== -1) {
        return 1;
      }
      if (a.invoice[0] !== -1 && b.invoice[0] === -1) {
        return -1;
      }
      return 0;
    });
  }

  sortByVitalCard(members: Member[]) {
    members.sort((a, b) => {
      if (a.vitalCard < b.vitalCard) {
        return -1;
      }
      if (a.vitalCard > b.vitalCard) {
        return 1;
      }
      return 0;
    });
    members.sort((a, b) => {
      if (a.vitalCard === -1 && b.vitalCard !== -1) {
        return 1;
      }
      if (a.vitalCard !== -1 && b.vitalCard === -1) {
        return -1;
      }
      return 0;
    });
  }

  sortByMutualCard(members: Member[]) {
    members.sort((a, b) => {
      if (a.mutualCard < b.mutualCard) {
        return -1;
      }
      if (a.mutualCard > b.mutualCard) {
        return 1;
      }
      return 0;
    });
    members.sort((a, b) => {
      if (a.mutualCard === -1 && b.mutualCard !== -1) {
        return 1;
      }
      if (a.mutualCard !== -1 && b.mutualCard === -1) {
        return -1;
      }
      return 0;
    });
  }

  sortByPrescription(members: Member[]) {
    members.sort((a, b) => {
      if (a.prescription < b.prescription) {
        return -1;
      }
      if (a.prescription > b.prescription) {
        return 1;
      }
      return 0;
    });
    //sort members with prescription equal to -1 to the bottom of the list
    members.sort((a, b) => {
      if (a.prescription === -1 && b.prescription !== -1) {
        return 1;
      }
      if (a.prescription !== -1 && b.prescription === -1) {
        return -1;
      }
      return 0;
    });
  }

  showSearchedMembers(members: Member[], search: string) {
    let searchedMembers: Member[] = [];
    members.forEach((member) => {
      if (member.firstName.toLowerCase().includes(search.toLowerCase()) || member.lastName.toLowerCase().includes(search.toLowerCase())) {
        searchedMembers.push(member);
      }
    });
    return searchedMembers;
  }
}
