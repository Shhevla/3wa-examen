import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Practitioners } from 'src/app/shared/models/practitioner.model';
import { AuthService } from 'src/app/shared/services/auth.services';
import { MembersService } from 'src/app/shared/services/members.service';
import { PractitionersService } from 'src/app/shared/services/practitioners.service';
import { UserProfile } from 'src/app/shared/models/profile.model';
import { CallApiService } from 'src/app/shared/services/call-api.service';
import { Cabinet } from 'src/app/shared/models/cabinet.model';
import { getAuth } from 'firebase/auth';
import { CabinetService } from 'src/app/shared/services/cabinet.service';
import { CabinetOptionComponent } from '../cabinet-option/cabinet-option.component';
import { LocationsService } from 'src/app/shared/services/locations.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  stop: boolean = true;
  index: number = 0; 
  cityLocation?:string;
  locations: Object[] = [];
  practitioners: Practitioners[] = [];
  invitePractitionerForm!: FormGroup;
  user: UserProfile | null = null;
  practitionersSubscription!: Subscription;
  locationSubscription!: Subscription;
  allCabinet: Cabinet[]  =  [];
  allId: String[] = [];
  allPath: String[] = [];
  selectedCabinet: Cabinet | undefined;
  CabinetCheck: boolean[] = [];
  selectedWorker: String | undefined;
  selectedCabinetId: String | undefined;
  selectedCabinetPath: String | undefined;

  constructor(private callApi: CallApiService ,private formBuilder: FormBuilder, private authService: AuthService, 
              private router: Router, private practitionersService: PractitionersService, 
              private locationsService: LocationsService, private cabinetservice: CabinetService,
              private message: MessagesService) { }

  async ngOnInit() {
    this.locationSubscription = this.locationsService.locationsSubject.subscribe((locations: Object[]) => {
      this.locations = locations;
    });
    this.locationsService.getAllLocations();

    this.practitionersSubscription = this.practitionersService.practitionersSubject.subscribe((practitioner: Practitioners[]) => {
      this.practitioners = practitioner;
    });
    this.practitionersService.getPractitioners();
    this.practitionersService.emitPractitioners();
    this.initForm();

    await this.callApi.getLoginData().then(data => {
      if (data)
        this.user = data;
    });

    await this.callApi.allCabinetWork(getAuth().currentUser?.uid!).then((data) => { 
        this.allCabinet = data[0] as Cabinet[];
        this.allId = data[1] as String[];
        this.allPath = data[2] as String[];
        

        for (let i = 0; this.allCabinet.length > i; i++) {
          if ( this.allCabinet[i] != undefined && this.allCabinet[i].practitioners != undefined) {
            this.allCabinet[i].practitioners.forEach((data) => { 
              
                if (data.id == getAuth().currentUser?.uid! && data.role == "Titulaire") {
                    this.CabinetCheck[i] = true;
                    
                } else if (data.id == getAuth().currentUser?.uid! && data.role == "Colaborateur")   
                    this.CabinetCheck[i] = false;
            })
          }
        }
    });
}

  initForm() {
    this.invitePractitionerForm = this.formBuilder.group({
      email: ["", Validators.required],
    })
  }

  async applyModifications() {
    if (this.user) {
      await this.callApi.updateLoginData(this.user);
      let data = await this.callApi.updateLoginData(this.user);
      if (data.response == "200") {
        this.message.displayMessage("Profil mis à jour", "resolve");
      } else {
        this.message.displayMessage("Une erreur est survenue", "reject");
      }
    }
  }
  //------------------Cabinet---------------//

  showOptionCabinet(index: number) {
    let container = document.getElementById("cabinet-option-id-" + index);
    
    for (let i = 0; this.allCabinet.length > i; i++) {
      let container = document.getElementById("cabinet-option-id-" + i);
      if(container) {
        container.style.display = "none";
      }
    }

    if(container) {
      container.style.display = "block";
    }
  }

  @ViewChild(CabinetOptionComponent)
  private modifyComponent = {} as CabinetOptionComponent;

  setSelectedCabinet(cabinet: Cabinet, index: number) {
      this.selectedCabinet = cabinet;
      this.modifyComponent.selectedCabinet = cabinet;  
      this.modifyComponent.cabinet = this.allCabinet[index];
      this.modifyComponent.cabinetId = this.allId[index];
      this.modifyComponent.cabinetPath = this.allPath[index];
      this.modifyComponent.ngAfterViewInit();
  }

  showCreateCabinet() {
      let container = document.getElementById("create-cabinet-id");
      let background = document.getElementById("create-cabinet-back")
      if(container && background) {
        this.hideAll();
        background.style.display = "block";
        container.style.display = "block"
      }
  }
  hideAll() {
    let createContainer = document.getElementById("create-cabinet-id");
    let createBackground = document.getElementById("create-cabinet-back");
    let optionContainer = document.getElementById("cabinet-option-id");
    let optionBackground = document.getElementById("cabinet-option-back")

    if(createContainer && createBackground) {
      createContainer.style.display = "none";
      createBackground.style.display = "none";
    }

    if(optionBackground && optionContainer ) {
      optionContainer.style.display = "none";
      optionBackground.style.display = "none";
    }
  }
  // --------------------------- //

  logout() {
    this.router.navigate(['home']);
    this.authService.signOutUser();
  }

  changeToProfile() {
    document.getElementById('profile-container')!.style.display = 'flex';
    document.getElementById('location-management-test')!.style.display = 'none';
    document.getElementById('location-management')!.style.display = 'none';
    
  }

  changeToManagement() {
    document.getElementById('profile-container')!.style.display = 'none';
    document.getElementById('location-management-test')!.style.display = 'none';
    document.getElementById('location-management')!.style.display = 'flex';
  }

  changeToManagementTest() {
    document.getElementById('profile-container')!.style.display = 'none';
    document.getElementById('location-management')!.style.display = 'none';
    document.getElementById('location-management-test')!.style.display = 'flex';
  }


  changeToLocation() {
    document.getElementById('location-part')!.style.display = 'flex';
    document.getElementById('role-part')!.style.display = 'none';
    
  }

  changeToRole() {
    document.getElementById('location-part')!.style.display = 'none';
    document.getElementById('role-part')!.style.display = 'flex';
  }

  onChangeLocation(event: any) {

    // need to protect event
    let city = event.target.value;
    this.cityLocation = city;
    this.practitionersService.getSpecificLocationPractitioner(city);
  }

  invitePractitioner() {
    
  }

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

  showDelWorkerModal(modalIndex: string, backgroundIndex: string, workerId: String) {
		let modal = document.getElementById(backgroundIndex);
		let modalContent = document.getElementById(modalIndex);
		if(modal && modalContent) {
			this.selectedWorker = workerId;
			modal.style.display = "block";
			modalContent.style.display = "flex";
		}
	}

	hideDelWorkerModal(modalIndex: string, backgroundIndex: string) {
		let modal = document.getElementById(backgroundIndex);
		let modalContent = document.getElementById(modalIndex);
		if(modal && modalContent) {
			this.selectedWorker = undefined;
			modal.style.display = "none";
			modalContent.style.display = "none";
		}
	}

  showDelCabinetModal(modalIndex: string, backgroundIndex: string, cabinetId: String, cabinetPath: String) {
		let modal = document.getElementById(backgroundIndex);
		let modalContent = document.getElementById(modalIndex);
		if(modal && modalContent) {
      this.selectedCabinetId = cabinetId;
      this.selectedCabinetPath = cabinetPath;
			modal.style.display = "block";
			modalContent.style.display = "flex";
		}
	}

  hideDelCabinetModal(modalIndex: string, backgroundIndex: string) {
    let modal = document.getElementById(backgroundIndex);
    let modalContent = document.getElementById(modalIndex);
    if(modal && modalContent) {
      this.selectedCabinetId = undefined;
      this.selectedCabinetPath = undefined;
      modal.style.display = "none";
      modalContent.style.display = "none";
    }
  }

  delWorker() {
    // call delWorker() from cabinet-option component
    if (this.selectedWorker == undefined) return;
    this.modifyComponent.delWorker(this.selectedWorker);
    this.hideDelWorkerModal("del-worker-modal", "del-worker-modal-background");
  }

  removeCabinet() {
    if (this.selectedCabinetId == undefined || this.selectedCabinetPath == undefined) return;
    this.callApi.removeCab(this.selectedCabinetId, this.selectedCabinetPath).then(() => {
      this.message.displayMessage("Cabinet supprimer avec succès", "resolve");
    })
    location.reload();
  }
}
