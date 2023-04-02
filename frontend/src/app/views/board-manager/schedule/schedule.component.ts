import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Appointment, BasicInformations, DateReccurences, HoursInformations} from 'src/app/shared/models/appointment-model';
import { Practitioners } from 'src/app/shared/models/practitioner.model';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { PractitionersService } from 'src/app/shared/services/practitioners.service';
import { ScheduleWeekComponent } from './schedule-week/schedule-week.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  
  displayMode: string = 'week';
  date = "Janvier";
  day = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  cabinetId = this.router.url.split("/", 3)[2];

  practitioners: Practitioners[] = [];
  practitionersSubscription!: Subscription;

  appointments: Appointment[] = [];
  appointmentsSubscription!: Subscription;

  constructor(private practitionersService: PractitionersService, private router: Router, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.getDateOfFirstDay();

    this.practitionersSubscription = this.practitionersService.practitionersSubject.subscribe((practitioner: Practitioners[]) => {
      this.practitioners = practitioner;
    });
    this.practitionersService.getPractitioners();
    this.practitionersService.emitPractitioners();

    this.appointmentsSubscription = this.calendarService.appointmentsMonthSubject.subscribe((appointment: Appointment[]) => {
      this.appointments = appointment;
    });
    this.calendarService.getAppointmentsList(this.cabinetId);
    this.calendarService.emitAppointments();
  }

  @ViewChild(ScheduleWeekComponent)
  public scheduleWeekComponent?: ScheduleWeekComponent;

  setDisplayMode(mode: string) {
    this.displayMode = mode;
  }

  switchButton(mode: string) {
    if (mode == 'next')
      this.scheduleWeekComponent?.switchWeek('next');
    else
      this.scheduleWeekComponent?.switchWeek('previous');
  }

  changeMonth(date: string) {
    this.date = date;
  }

  getDateOfFirstDay() {
    let dayToCheck = new Date()
    this.date = this.month[dayToCheck.getMonth()] + " " + dayToCheck.getFullYear();
  }

  createAppointment() {
    const appointment: Appointment = {
        basicInfos: {
            firstName: 'Jzzdohn',
            lastName: 'Doe',
            phone: '555-555-5555',
            mail: 'john.dzdoe@example.com',
            address: '123 Main St',
            zipCode: '12345',
            city: 'Anytown USA'
        },
        practitioner: 'Dr. Jane Smith',
        date: {
            day: 'Monday',
            startTime: '10:00 AM',
            endTime: '11:00 AM'
        },
        reccurences: {
            daysList: [true, false, false, false, false, false, false],
            startDate: '2023-04-01',
            endDate: '2023-04-30'
        },
        notes: 'Please arrive 10 minutes early for paperwork.'
    };

    this.calendarService.createAppointment(appointment, this.cabinetId)
  }

  popupVisible: boolean = false;
  
  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }
}
