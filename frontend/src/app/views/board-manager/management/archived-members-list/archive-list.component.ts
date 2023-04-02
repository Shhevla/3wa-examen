import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/shared/models/member.model';
import { MembersService } from 'src/app/shared/services/members.service';
import { Documents } from 'src/app/shared/models/documents.model';
import * as global from 'src/app/shared/services/global.service';
import { ArchivesService } from 'src/app/shared/services/archives.service';
import { StorageManagementService } from 'src/app/shared/services/storage-management.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss']
})
export class ArchiveListComponent implements OnInit { 
  
  uid :string = getAuth().currentUser?.uid!;
  cityLocation?:string;
  selectedMember?: Member;

  archivedMembers: Member[] = [];
  archives: Object[] = [];
  documents: Documents[] = [];

  archivedMembersSubscription!: Subscription;
  archivesSubscription!: Subscription;
  documentsSubscription!: Subscription;

  constructor(private membersService: MembersService, private router: Router,
              private archivesService: ArchivesService, private udFile:StorageManagementService) { }

  ngOnInit(): void {

    if (global.isMobile === true) {
      this.addClassForDisplayMode();
    }

    this.cityLocation = this.router.url.split("/", 3)[2];
    this.archivesService.cityLocation = this.router.url.split("/", 3)[2];

    this.archivedMembersSubscription = this.archivesService.archivedMemberSubject.subscribe((archivedMembers: Member[]) => {
      this.archivedMembers = archivedMembers;
    });
    
    this.archivesService.getAllArchivedMembers();
    this.archivesService.emitArchivedMembers();

    this.archivesSubscription = this.archivesService.archivesSubject.subscribe((archives: Object[]) => {
      this.archives = archives;
    });
    this.archivesService.getAllArchives();

    this.documentsSubscription = this.membersService.documentsSubject.subscribe((documents: Documents[]) => {
      this.documents = documents;
    });
    this.udFile.emitDocuments();
  }

  onViewMember(id: number) {
    this.router.navigate(['/members', 'view', id]);
  }

  ngOnDestroy() {
    this.archivedMembersSubscription.unsubscribe();
    this.archivesSubscription.unsubscribe();
  }

  // switch to a different location
  onViewLocation(event: any) {
    let city = event.target.value;
    this.cityLocation = city
    this.membersService.cityLocation = city;
    this.archivesService.getAllArchivedMembers();
    this.archivesService.emitArchivedMembers();
    this.router.navigate(['/archive', city]);
  }
  
  // switch to calendar mode
  onViewCalendar() {
    let city = this.membersService.cityLocation;
    this.router.navigate(['/calendar', city]);
  }

  // SHOW SEARCHED MEMBERS
  
  showSearchedMembers(event: any) {
    this.archivedMembers = this.archivesService.archivedMembers;
    let elementToSearch = document.getElementById("members-search-bar")! as HTMLInputElement ;

    if (elementToSearch.value) {
      this.archivedMembers = this.archivesService.showArchivedSearchedMembers(this.archivedMembers, elementToSearch.value);
    }
  }


  goToLocationList() {
    this.router.navigate(['/location']);
  }

  // delete selected member
  onDeleteMember() {
    if (this.selectedMember)
      this.membersService.removeMember(this.selectedMember);
  }

  onDeleteArchivedMember() {
    if (this.selectedMember)
      this.archivesService.removeArchivedMember(this.selectedMember);
  }

  onAddToList() {
    if (this.selectedMember) {
      this.archivesService.addMembersToList(this.selectedMember);
      this.onDeleteArchivedMember();
    }
  }

  // Selected Member //

  setSelectedMember(member: Member) {
      this.selectedMember = member;
  }

  // Modal 

  showModal(modalIndex: string, backgroundIndex: string) {
    let modal = document.getElementById(backgroundIndex);
    let modalContent = document.getElementById(modalIndex);
    if(modal && modalContent) {
      modal.style.display = "block";
      modalContent.style.display = "flex";
    }
  }

  hideModal(modalIndex: string, backgroundIndex: string) {
    let modal = document.getElementById(backgroundIndex);
    let modalContent = document.getElementById(modalIndex);
    if(modal && modalContent) {
      modal.style.display = "none";
      modalContent.style.display = "none";
    }
  }

  //* confirmation modal

  showConfirmationModal(member: Member) {
    let modal = document.getElementById("confirmation-modal");
    let modalContent = document.getElementById("confirmation-modal-content");
    if(modal && modalContent) {
      modal.style.display = "block";
      modalContent.style.display = "flex";
      this.selectedMember = member;
    }
  }

  hideConfirmationModal() {
    let modal = document.getElementById("confirmation-modal");
    let modalContent = document.getElementById("confirmation-modal-content");
    if(modal && modalContent) {
      modal.style.display = "none";
      modalContent.style.display = "none";
    }
  }

  showDocumentModal(modalIndex: string, backgroundIndex: string, member :Member) {
    let modal = document.getElementById(backgroundIndex);
    let modalContent = document.getElementById(modalIndex);
    if(modal && modalContent) {
      modal.style.display = "block";
      modalContent.style.display = "flex";
      this.selectedMember = member;
    }
  }

  goToLocation(location: string) {
    this.cityLocation = this.membersService.cityLocation;
    this.router.navigate(["/board", this.cityLocation, location]);
  }

  addClassForDisplayMode() {
    global.set(true);
    var elementToChange = document.getElementById("main-board");
    var buttonToChange = document.getElementById("switch-button-container");
    if (elementToChange && !elementToChange.classList.contains("mobile-version")) {
      elementToChange.classList.add("mobile-version")
      buttonToChange?.children[0].classList.add("low-opacity");
      buttonToChange?.children[1].classList.remove("low-opacity");
    }
  }

  removeClassForDisplayMode() {
    global.set(false);
    var elementToChange = document.getElementById("main-board");
    var buttonToChange = document.getElementById("switch-button-container");
    if (elementToChange && elementToChange.classList.contains("mobile-version")) {
      elementToChange.classList.remove("mobile-version")
      buttonToChange?.children[1].classList.add("low-opacity");
      buttonToChange?.children[0].classList.remove("low-opacity");
    }
  }

  hideAll() {
    let editContainer: any = document.getElementsByClassName("edit-mode");
    let modalBack = document.getElementById("edit-modal");
    
    for (let item of editContainer) {
      item.style.display = "none";
    }
    if (modalBack) {
      modalBack.style.display = "none"
    }
  }

  // File Part

  getAllFiles() {
    if (this.cityLocation && this.selectedMember?.firstName) {
      this.udFile.getAllFiles(this.cityLocation, this.selectedMember, this.uid);
    }
  }

  removeFile(document: Documents) {
    if (this.cityLocation && this.selectedMember?.firstName) {
      this.udFile.removeDocument(this.cityLocation, this.selectedMember, document, this.uid)
    }
  }

  // PAGE PART // 
  
  pageUp() {
    var elementToChange = document.getElementById("board-line-container");
    elementToChange!.scrollTop += -495;
  }

  pageDown() {
    var elementToChange = document.getElementById("board-line-container");
    elementToChange!.scrollTop += 495;
  }
}
