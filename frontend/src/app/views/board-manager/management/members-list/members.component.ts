import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/shared/models/member.model';
import { Documents } from 'src/app/shared/models/documents.model';
import { MembersService } from 'src/app/shared/services/members.service';
import * as global from 'src/app/shared/services/global.service';
import { ModifyMemberComponent } from './modify-member/modify-member.component';
import { ModifyPractitionersComponent } from './modify-practitioners/modify-practitioners.component';
import { PractitionersService } from 'src/app/shared/services/practitioners.service';
import { Practitioners } from 'src/app/shared/models/practitioner.model';
import { LocationsService } from 'src/app/shared/services/locations.service';
import { ArchivesService } from 'src/app/shared/services/archives.service';
import { CallApiService } from 'src/app/shared/services/call-api.service';
import { getAuth } from 'firebase/auth';
import { StorageManagementService } from 'src/app/shared/services/storage-management.service';



@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {
  uid :string = getAuth().currentUser?.uid!;
  cityLocation?:string;
  selectedMember?: Member;
  selectedPractitioner?: Practitioners;

  locations: Object[] = [];
  archives: Object[] = [];
  members: Member[] = [];
  practitioners: Practitioners[] = [];
  archivedMembers: Member[] = [];
  documents: Documents[] = [];

  locationSubscription!: Subscription;
  archiveSubscription!: Subscription;
  membersSubscription!: Subscription;
  practitionersSubscription!: Subscription;
  archivedMembersSubscription!: Subscription;
  documentsSubscription!: Subscription;

  constructor(private membersService: MembersService,private practitionersService: PractitionersService,
              private router: Router, private locationsService: LocationsService, 
              private archivesService: ArchivesService, private api: CallApiService, private udFile: StorageManagementService) { }

  ngOnInit(): void {

    this.reloadAll();
    this.cityLocation = this.router.url.split("/", 3)[2];
    this.membersService.cityLocation = this.router.url.split("/", 3)[2];

    this.membersSubscription = this.membersService.membersSubject.subscribe((members: Member[]) => {
      this.members = members;
    });
    this.membersService.getMembers();
    this.membersService.emitMembers();

    this.locationSubscription = this.locationsService.locationsSubject.subscribe((locations: Object[]) => {
      this.locations = locations;
    });
    this.locationsService.getAllLocations();

    this.practitionersSubscription = this.practitionersService.practitionersSubject.subscribe((practitioner: Practitioners[]) => {
      this.practitioners = practitioner;
    });
    this.practitionersService.getPractitioners();
    this.practitionersService.emitPractitioners();

    this.archivedMembersSubscription = this.archivesService.archivedMemberSubject.subscribe((archivedMembers: Member[]) => {
      this.archivedMembers = archivedMembers;
    });
    this.membersService.cityLocation = this.cityLocation;
    this.archivesService.getAllArchivedMembers();
    this.archivesService.emitArchivedMembers();

    this.documentsSubscription = this.membersService.documentsSubject.subscribe((documents: Documents[]) => {
      this.documents = documents;
    });
    this.udFile.emitDocuments();
  }

  reloadAll() {
    this.members = [];
    this.locations = [];
    this.practitioners = [];
    this.archives = [];
    this.archivedMembers = [];
  }

  onNewMember() {
    this.router.navigate(["/members", "new"]);
  }

  onViewMember(id: number) {
    this.router.navigate(['/members', 'view', id]);
  }

  ngOnDestroy() {
    this.unsubcribeAll();
  }

  unsubcribeAll() {
    if (this.membersSubscription)
    this.membersSubscription.unsubscribe();
    if (this.locationSubscription)
      this.locationSubscription.unsubscribe();
    if (this.archiveSubscription)
      this.archiveSubscription.unsubscribe();
  }

  onNewLocation() {
    let test = <HTMLInputElement>document.getElementById("city");
    var newLocation = {
      name: test.value,
    };
    
    this.membersService.cityLocation = test.value;

    if (!this.locationsService.locations.includes(test.value)) {
      this.locationsService.createLocation(newLocation);
      let city = test.value;
      this.cityLocation = city
      this.membersService.cityLocation = city;
      this.membersService.getMembers();
      this.router.navigate(['/location', city]);
    }
  }

  onViewLocation(event: any) {
    this.ngOnDestroy();
    this.ngOnInit();
    this.archivedMembers = [];
    let city = event.target.value;
    this.cityLocation = city
    this.membersService.cityLocation = city;
    this.archivesService.getAllArchivedMembers();
    this.archivesService.emitArchivedMembers();
    this.membersService.getMembers();
    this.router.navigate(['/location', city]);
  }

  onViewCalendar() {
    let city = this.membersService.cityLocation;
    this.router.navigate(['/calendar', city]);
  }

  goToLocationList() {
    this.router.navigate(['/location']);
  }

    

  onDeleteMember() {
    if (this.selectedMember)
      this.membersService.removeMember(this.selectedMember);
      this.udFile.removeAllDocuments(this.cityLocation!, this.selectedMember!, this.uid);
  }

  onAddToArchive() {
    if (this.selectedMember) {
      this.archivesService.addMembersToArchive(this.selectedMember);
      this.onDeleteMember()
    }
  }

  // Selected Member //

  @ViewChild(ModifyMemberComponent)
  private modifyComponent = {} as ModifyMemberComponent;

  setSelectedMember(member: Member) {
    
    
      this.selectedMember = member;
      this.modifyComponent.selectedMember = member;
      this.modifyComponent.initForm();
  }




  // MODAL // 

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

  showDocumentModal(modalIndex: string, backgroundIndex: string, member :Member) {
    let modal = document.getElementById(backgroundIndex);
    let modalContent = document.getElementById(modalIndex);
    if(modal && modalContent) {
      modal.style.display = "block";
      modalContent.style.display = "flex";
      this.selectedMember = member;
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


  changeMemberInvoice(member: Member, value: number, index: number) {
    if (value === -1 || value === 0 || value === 1)
      member.invoice[index] = value;
      this.saveAll();
  }

  changeMemberVitalCard(member: Member, value: number) {
    if (value === -1 || value === 0 || value === 1)
      member.vitalCard = value;
      this.saveAll();
  }

  changeMemberMutualCard(member: Member, value: number) {
    if (value === -1 || value === 0 || value === 1)
      member.mutualCard = value;
      this.saveAll();
  }

  changeMemberPrescription(member: Member, value: number) {
    if (value === -1 || value === 0 || value === 1)
      member.prescription = value;
      this.saveAll();
  }

  showEditMode(line: number, num: number ) {
    this.hideAll()
    let modal = document.getElementById(line.toString()+'-'+num.toString()+'-edit-container');
    let modalBack = document.getElementById("edit-modal");
    if (modal)
    {
      modal.style.display = 'flex';
      modal.animate([
        { opacity: "0" },
        { opacity: "1" },
      ], {
        duration: 100,
      })
    }

    if (modalBack){
      modalBack.style.display = "block";}
  }

  showSpecificEditMode(line: number, index: number, num: number) {
    this.hideAll()
    let modal = document.getElementById(line.toString()+'-'+index.toString()+'-'+num.toString()+'-edit-container');
    let modalBack = document.getElementById("edit-modal");
    if (modal)
    {
      modal.style.display = 'flex';
      modal.animate([
        { opacity: "0" },
        { opacity: "1" },
      ], {
        duration: 100,
      })
    }

    if (modalBack){
      modalBack.style.display = "block";}
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

  hideEditMode(line: number, num: number) {
    let modal = document.getElementById(line.toString()+'-'+num.toString()+'-edit-container');
    if (modal)
      modal.style.display = "none";
  }

  hideSpecificEditMode(line: number,index: number, num: number) {
    let modal = document.getElementById(line.toString()+'-'+index.toString()+'-'+num.toString()+'-edit-container');
    if (modal)
      modal.style.display = "none";
  }

  saveAll() {
    this.membersService.saveMembers();
  }

  goToLocation(location: string) {
    this.cityLocation = this.membersService.cityLocation;
    this.router.navigate(["/board", this.cityLocation, location]);
  }

  checkInput(value : number ,event: Event) {
    let element = event.target as Element;

    element?.removeAllListeners!("input");
    element.addEventListener("input", el => {
      this.displaySaveButton(value);
    })
  }

  displaySaveButton(value : number) {
    const content = document.getElementById(`${value}-save-button-comment`)
    if (content && content.style.display == "") {
      content.style.display = "block";
      content.animate([
        { opacity: "0" },
        { opacity: "1" },
      ], {
        duration: 150,
      })
    }
  }

  saveComment(member: Member, value: number) {
    const content = document.getElementById(`${value}-comment`);
    const saveContent = document.getElementById(`${value}-save-button-comment`);
    if (content) {
      member.comments = content?.innerText;
      if (saveContent)
        saveContent.style.display = "none";
      this.saveAll();
    }
  }

  //! File PART !//

  uploadFile(event: any) {
    let file:File = event!.target!.files[0];
    if (file && this.membersService.cityLocation && this.selectedMember?.firstName) {
      this.udFile.uploadFile(file, this.membersService.cityLocation, this.selectedMember, this.uid);
    }
  }

  getAllFiles() {
    if (this.membersService.cityLocation && this.selectedMember?.firstName) {
      console.log(this.selectedMember?.firstName," : test : ", this.membersService.cityLocation);
      this.documents = this.udFile.getAllFiles(this.membersService.cityLocation, this.selectedMember, this.uid);
    }
  }

  removeFile(document: Documents) {
    if (this.membersService.cityLocation && this.selectedMember?.firstName) {
      this.udFile.removeDocument(this.membersService.cityLocation, this.selectedMember, document, this.uid)
    }
  }

  //! PAGE PART !//

  pageUp() {
    let elementToChange = document.getElementById("board-line-container");
    elementToChange!.scrollTop += -495;
  }

  pageDown() {
    let elementToChange = document.getElementById("board-line-container");
    elementToChange!.scrollTop += 495;
  }

  // SORT MEMBER BY NAME

  removeAllSortedClass() {
    let elements: any = document.getElementsByClassName("sorted-button");
    
    for (let element of elements) {
      element.classList.remove("sort-selected");
    }
  }
  
  addSortedClass(event : Event) {
    this.removeAllSortedClass();
    let element = event.target as Element;
    if (element) {
      element.children[0].classList.add("sort-selected");
    }
  }

  sortByName(event : Event) {
    this.membersService.sortByName(this.members);
    this.addSortedClass(event);
  }

  sortByInvoice(event : Event) {
    this.membersService.sortByInvoice(this.members);
    this.addSortedClass(event);
  }
  
  sortByVitalCard(event : Event) {
    this.membersService.sortByVitalCard(this.members);
    this.addSortedClass(event);
  }

  sortByMutualCard(event : Event) {
    this.membersService.sortByMutualCard(this.members);
    this.addSortedClass(event);
  }

  sortByPrescription(event : Event) {
    this.membersService.sortByPrescription(this.members);
    this.addSortedClass(event);
  }

  // SHOW SEARCHED MEMBERS
  
  showSearchedMembers(event: any) {
    this.members = this.membersService.members;
    let elementToSearch = document.getElementById("members-search-bar")! as HTMLInputElement ;

    if (elementToSearch.value) {
      this.members = this.membersService.showSearchedMembers(this.members, elementToSearch.value);
    }
  }

  // PRACTIOTIONERS PART

  @ViewChild(ModifyPractitionersComponent)
  private ModifyPractitionerComponent = {} as ModifyPractitionersComponent;

  setSelectedPractitioner(practitioner: Practitioners) {
    this.selectedPractitioner = practitioner;
    this.ModifyPractitionerComponent.selectedPractitioners = practitioner;
    this.ModifyPractitionerComponent.initForm();
  }

  addPractitioner(practitioners: Practitioners) {
    this.practitionersService.createPractitioner(practitioners);
  }

  removePractitioner(practitioners: Practitioners) {
    this.practitionersService.removePractitioner(practitioners);
  }

}