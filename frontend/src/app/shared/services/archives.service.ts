import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Member } from '../models/member.model';
import { Documents } from '../models/documents.model';
import { getDatabase, ref, set, onValue} from "firebase/database";
import { deleteObject, getDownloadURL, getStorage, listAll, ref as _storageRef, StorageReference, uploadBytesResumable } from 'firebase/storage';
import { MembersService } from './members.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivesService {

  cityLocation = "";
  archives: Object[] = [];
  archivedMembers: Member[] = [];

  archivesSubject = new Subject<Object[]>();
  archivedMemberSubject = new Subject<Member[]>();

  constructor(private memberServices: MembersService) { }

  getAllArchives() {
    const db = getDatabase();
    const path = ref(db, "archives/");
    onValue(path, (data) => {
      const dbVal = data.val() ? data.val() : [];
      this.archives = Object.keys(dbVal)
      this.emitArchives();
    });
  }

  addMembersToArchive(member: Member) {
    const db = getDatabase();
    this.archivedMembers.push(member);
    set(ref(db, "archives/" + this.cityLocation + "/members/"), this.archivedMembers);
  }

  addMembersToList(member: Member) {
    const db = getDatabase();
    this.memberServices.getMembers();
    this.memberServices.members.push(member);
    set(ref(db, "locations/" + this.cityLocation + "/members/"), this.memberServices.members);
  }

  addLocationToArchive(location: string) {
    const db = getDatabase();
    const path = ref(db, "locations/" + location + "/members/");
    onValue(path, (data) => {
      let membersToAdd = data.val() ? data.val() : [];
      set(ref(db, "archives/" + location + "/members/"), membersToAdd);
    });
  }

  addLocationToList(archive: string) {
    const db = getDatabase();
    const path = ref(db, "archives/" + archive + "/members/");
    onValue(path, (data) => {
      let membersToAdd = data.val() ? data.val() : [];
      set(ref(db, "locations/" + archive + "/members/"), membersToAdd);
    });
  }

  emitArchives() {
    this.archivesSubject.next(this.archives);
  }

  emitArchivedMembers() {
    this.archivedMemberSubject.next(this.archivedMembers);
  }

  saveArchivedMembers() {
    const db = getDatabase();
    set(ref(db, "archives/" + this.cityLocation + "/members/"), this.archivedMembers)
  }

  getAllArchivedMembers() {
    const db = getDatabase();
    const path = ref(db, "archives/" + this.cityLocation + "/members/");
    onValue(path, (data) => {
      this.archivedMembers = data.val() ? data.val() : [];
      this.emitArchivedMembers();
    });
  }

  removeArchivedMember(member: Member) {
    const memberIndex = this.archivedMembers.findIndex((memberElement) => {
      if(memberElement === member) {
        return true;
      } else {
        return false;
      }
    })
    this.archivedMembers.splice(memberIndex, 1);
    this.saveArchivedMembers();
    this.emitArchives();
  }

  showArchivedSearchedMembers(members: Member[], search: string) {
    let searchedMembers: Member[] = [];
    members.forEach((member) => {
      if (member.firstName.toLowerCase().includes(search.toLowerCase()) || member.lastName.toLowerCase().includes(search.toLowerCase())) {
        searchedMembers.push(member);
      }
    });
    return searchedMembers;
  }
}
