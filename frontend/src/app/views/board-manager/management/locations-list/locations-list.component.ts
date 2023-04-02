import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArchivesService } from 'src/app/shared/services/archives.service';
import { LocationsService } from 'src/app/shared/services/locations.service';
import { MembersService } from 'src/app/shared/services/members.service';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss']
})
export class LocationsListComponent implements OnInit {

  locations: Object[] = [];
  locationSubscription!: Subscription;
  archives: Object[] = [];
  archiveSubscription!: Subscription;

  constructor(private membersService: MembersService, private router: Router,
              private locationsService: LocationsService, private archivesService: ArchivesService) { }

  ngOnInit(): void {
    this.locationSubscription = this.locationsService.locationsSubject.subscribe((locations: Object[]) => {
      this.locations = locations;
    });
    this.locationsService.getAllLocations();

    this.archiveSubscription = this.archivesService.archivesSubject.subscribe((archives: Object[]) => {
      this.archives = archives;
    });
    this.archivesService.getAllArchives();
  }

  onNewLocation() {
    let test = <HTMLInputElement>document.getElementById("city");
    var newLocation = {
      name: test.value,
    };
    
    this.membersService.cityLocation = test.value;

    if (!this.locationsService.locations.includes(test.value)) {
      this.locationsService.createLocation(newLocation);
    }
  }

  switchList(list: string) {
    let archivedTypeList = document.getElementById("type-archive");
    let listTypeList = document.getElementById("type-list");

    if (list === "archive") {
      archivedTypeList?.classList.remove("hide");
      listTypeList?.classList.add("hide");

    } else if (list === "list") {
      listTypeList?.classList.remove("hide");
      archivedTypeList?.classList.add("hide");
    }
  }

  ngOnDestroy() {
    this.locationSubscription.unsubscribe();
  }

  onViewLocation(city: string) {
    this.membersService.cityLocation = city;
    this.router.navigate(['/board', city, "location"]);
  }

  onViewArchivedLocation(city: string) {
    this.membersService.cityLocation = city;
    this.router.navigate(['/board', city, "archive"]);
  }

  onDeleteLocation(location: Object) {
    this.locationsService.removeLocation(location);
  }

  onAddToArchive(location: Object) {
    this.archivesService.addLocationToArchive(location.toString());
  }

  onAddToList(archive: Object) {
    this.archivesService.addLocationToList(archive.toString());
  }

  // MODAL // 

  showModal() {
    let modal = document.getElementById("modal");
    let modalContent = document.getElementById("modal-content");
    if(modal && modalContent) {
      modal.style.display = "block";
      modalContent.style.display = "flex";
    }
  }

  hideModal() {
    let modal = document.getElementById("modal");
    let modalContent = document.getElementById("modal-content");
    if(modal && modalContent) {
      modal.style.display = "none";
      modalContent.style.display = "none";
    }
  }
}
