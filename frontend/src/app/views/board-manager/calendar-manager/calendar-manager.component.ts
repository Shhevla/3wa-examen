import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../../shared/services/members.service';
import { Router } from '@angular/router';
import { CalendarService } from '../../../shared/services/calendar.service';

@Component({
  selector: 'app-calendar-manager',
  templateUrl: './calendar-manager.component.html',
  styleUrls: ['./calendar-manager.component.scss']
})
export class CalendarManagerComponent implements OnInit {

  cityLocation = this.router.url.split("/", 3)[2];

  constructor(private membersService: MembersService, private router: Router, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.cityLocation = this.router.url.split("/", 3)[2];
    this.membersService.cityLocation = this.router.url.split("/", 3)[2];
  }

  onViewLocation() {
    let city = this.membersService.cityLocation;
    this.router.navigate(['/location', city]);
  }

  goToLocationList() {
    this.router.navigate(['/location']);
  }
}