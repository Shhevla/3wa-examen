import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pending, UserProfile } from '../../shared/models/profile.model';
import { AuthService } from '../../shared/services/auth.services';
import { CalendarService } from '../../shared/services/calendar.service';
import { CallApiService } from '../../shared/services/call-api.service';
import { MembersService } from '../../shared/services/members.service';
import { PractitionersService } from '../../shared/services/practitioners.service';
import { LocationsService } from 'src/app/shared/services/locations.service';
import { ArchivesService } from 'src/app/shared/services/archives.service';
import { getAuth } from 'firebase/auth';
import { Cabinet } from 'src/app/shared/models/cabinet.model';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { CabinetService } from 'src/app/shared/services/cabinet.service';
@Component({
  selector: 'app-board-manager',
  templateUrl: './board-manager.component.html',
  styleUrls: ['./board-manager.component.scss']
})
export class BoardManagerComponent implements OnInit {

  cityLocation?:string;
  locations: Object[] = [];
  locationSubscription!: Subscription;
  user: UserProfile | null = null;
  allCabinet: Cabinet[]  =  [];
  allId: String[] = [];
  allPath: String[] = [];
  notifications: Pending[] = [];

  constructor(private membersService: MembersService, private calendarService: CalendarService,
              private route: ActivatedRoute, private router: Router, public callApi: CallApiService,
              private practitionersService: PractitionersService,
              public archivesService: ArchivesService, public authService: AuthService, 
              public locationsService: LocationsService, public messageServices: MessagesService, private cs: CabinetService) { }

  ngOnInit(): void {
    this.cityLocation = this.router.url.split("/", 3)[2];
    this.membersService.cityLocation = this.router.url.split("/", 3)[2];

    this.locationSubscription = this.locationsService.locationsSubject.subscribe((locations: Object[]) => {
      this.locations = locations;
    });
    this.callApi.allCabinetWork(getAuth().currentUser?.uid!).then((data) =>{
        this.allCabinet = data[0] as Cabinet[];
        this.allId = data[1] as String[];
        this.allPath = data[2] as String[];
    })
    this.locationsService.getAllLocations();
    this.refreshNotifications();

    if (this.router.url.split("/", 4)[1] === "profile") {
      this.switchBoard();
    }
    
  }


  refreshNotifications() {
    this.getProfile().then(() => {
      if (this.user) {
        this.notifications = this.user.pending;
      }
    });
    
  }

  onChangeLocation(location: Event) {
    let city = this.allId[parseInt((location.target as HTMLInputElement).value)] as string;
    this.cs.saveName(city);
    let actualBoard: string = this.router.url.split("/", 4)[3];
    this.cityLocation = city;
    this.membersService.cityLocation = city;
    this.archivesService.getAllArchivedMembers();
    this.archivesService.emitArchivedMembers();
    this.membersService.getMembers();
    this.practitionersService.getPractitioners();
    // this.calendarService.getFirestoreDB(this.membersService.cityLocation);
    this.router.navigate(['/board', city, actualBoard ? actualBoard : "location"]);
  }

  goToSingleLocation() {
    this.router.navigate(['location'], {relativeTo: this.route});
  }

  goToCalendar() {
    this.router.navigate(['calendar'], {relativeTo: this.route});
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  travelToModule(moduleName: string) {
    if (moduleName === "calendar") {
      this.router.navigate([`/board/${this.membersService.cityLocation}/calendar`]);

    } else  if (moduleName === "location") {
      this.cs.saveName(this.cityLocation!);
      this.router.navigate([`board/${this.membersService.cityLocation}/${moduleName}`]);
    } else {
      this.router.navigate(['/' + moduleName]);
    }

  }

  async getProfile(){
    await this.callApi.getLoginData().then(data => {
      if (data)
        this.user = data;
        
    });
  }

  acceptInvitation(notification: Pending) {
    let email = getAuth().currentUser!.email;
    if (email) {
      this.callApi.acceptInvitation(notification, email).then(() => {
        this.getProfile().then(() => {
          this.notifications = this.user?.pending as Pending[];
          this.messageServices.displayMessage("Invitation acceptée", "resolve");
        });
      });
    }
  }

  cancelInvitation(notification: Pending) {
    let email = getAuth().currentUser!.email;
    if (email) {
      this.callApi.cancelInvitation(notification, email).then(() => {
        this.getProfile().then(() => {
          this.notifications = this.user?.pending as Pending[];
          this.messageServices.displayMessage("Invitation refusée", "reject");
        });
      });
    }
  }

  switchBoard() {
    let modal = document.getElementById("only-management");
    if(modal) {
      modal.style.display = "none";
    }
  }

  counter(i: number) {
    return new Array(i);
  }

}
