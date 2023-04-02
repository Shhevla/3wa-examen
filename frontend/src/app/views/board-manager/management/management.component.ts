import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchivesService } from 'src/app/shared/services/archives.service';
import { AuthService } from 'src/app/shared/services/auth.services';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { CallApiService } from 'src/app/shared/services/call-api.service';
import { MembersService } from 'src/app/shared/services/members.service';
import { PractitionersService } from 'src/app/shared/services/practitioners.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  cityLocation?:string;
  locations: Object[] = [];

  constructor(private membersService: MembersService, private calendarService: CalendarService,
    private route: ActivatedRoute, private router: Router, private practitionersService: PractitionersService,
    public callApi: CallApiService, public authService: AuthService, private archivesService: ArchivesService) { }

  ngOnInit(): void {
    this.cityLocation = this.router.url.split("/", 3)[2];
  }

  onChangeLocation(location: any) {
    let city = location;
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

  travelToModule(moduleName: string) {
    if (moduleName === "board") {
      this.router.navigate([`/${moduleName}/${this.membersService.cityLocation}/calendar`]);

    } else if (moduleName === "location" || moduleName === "calendar") {
      this.router.navigate([`board/${this.membersService.cityLocation}/${moduleName}`]);

    } else {
      this.router.navigate(['/' + moduleName]);
    }

  }

}
