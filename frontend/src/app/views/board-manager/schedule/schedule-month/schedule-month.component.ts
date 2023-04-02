import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from 'src/app/shared/models/appointment-model';

@Component({
  selector: 'app-schedule-month',
  templateUrl: './schedule-month.component.html',
  styleUrls: ['./schedule-month.component.scss']
})
export class ScheduleMonthComponent implements OnInit {

  constructor() { }

  firstHour: number = 7;
  lastHour: number = 19;
  numberOfSubLines: number = 4;
  lineHeight: number = 10;
  day = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  month = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  actualWeek: Date[] = [];
  @Input() appointments: Appointment[] = [];

  ngOnInit(): void {
    this.setLineHeight()
    this.actualWeek = this.getCurrentWeekDays();
  }

  ngAfterViewInit() {
    this.renderActualDay();
  }

  setLineHeight() {
    if (this.numberOfSubLines == 4) {
      this.lineHeight = 10;
    } else if (this.numberOfSubLines == 2) {
      this.lineHeight = 22;
    } else {
      this.lineHeight = 46;
    }
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  @Output() dateChange = new EventEmitter<string>();

  getDateOfFirstDay() {
    let dayToCheck = this.actualWeek[0]
    this.dateChange.emit(this.month[dayToCheck.getMonth()] + " " + dayToCheck.getFullYear());
  }

  
  getCurrentWeekDays(): Date[] {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysOfWeek: Date[] = [];
  
    for (let i = 0; i < 7; i++) {
      const dayOffset = i - ((currentDayOfWeek + 6) % 7);
      const currentWeekDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + dayOffset
      );
      daysOfWeek.push(currentWeekDay);
    }
    return daysOfWeek;
  }

  switchWeek(direction: string): void {
    let firstDay = this.actualWeek[0];
    let lastDay = this.actualWeek[6];
    if (direction == 'next') {
      firstDay.setDate(firstDay.getDate() + 7);
      lastDay.setDate(lastDay.getDate() + 7);
    } else if (direction == 'previous') {
      firstDay.setDate(firstDay.getDate() - 7);
      lastDay.setDate(lastDay.getDate() - 7);
    }
    this.actualWeek = [];
    for (let i = 0; i < 7; i++) {
      let newDay = new Date(firstDay);
      newDay.setDate(newDay.getDate() + i);
      this.actualWeek.push(newDay);
    }
    this.renderActualDay();
    this.getDateOfFirstDay();
  }

  renderActualDay(): void {
    let today = new Date();
    let container = document.getElementsByClassName('day-container');

    if (!container) {
      console.error('Erreur : le conteneur .day-container est introuvable.');
      return;
    }

    for (let i = 0; i < this.actualWeek.length; i++) {
      container[i].classList.remove('actual-day');
      if (this.actualWeek[i].toDateString() == today.toDateString()) {
        container[i].classList.add('actual-day');
      }
    }
  }

  getAppointmentStart(appointment: Appointment): string {
    const [hours, minutes] = appointment.date.startTime.split(':').map(Number);
    const totalMinutes = (hours - this.firstHour) * 60 + minutes;
    const dayPercentage = totalMinutes / 1440;
    const value = Math.floor(dayPercentage * 574);
    if (value <= 0) {
      return '0px';
    }
    return value * 2 + 2 + 'px';
  }

  getCompleteName(appointment: Appointment): string {
    const firstLetter: string = appointment.basicInfos.firstName.charAt(0).toUpperCase();
    const lastName: string = this.capitalizeString(appointment.basicInfos.lastName)
    return `${firstLetter}. ${lastName}`
  }

  capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  checkDay(appointment: Appointment, day: number): boolean {
    const dateString = appointment.date.day;
    const dateParts = dateString.split("-");
    const dateObject = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));

    if (dateObject.getTime() === this.actualWeek[day].getTime()) {
      return true
    } else {
      return false
    }
  }

  getAppointmentHeight(appointment: Appointment): string {
    let [hours, minutes] = appointment.date.startTime.split(':').map(Number);
    let [hoursEnd, minutesEnd] = appointment.date.endTime.split(':').map(Number);
    if (hours < this.firstHour)
        hours = this.firstHour;
    if (hoursEnd > this.lastHour)
        hoursEnd = this.lastHour;
    if (hoursEnd == this.lastHour)
        minutesEnd = this.lastHour - 1;
    const totalMinutes = (hoursEnd - hours) * 60 + (minutesEnd - minutes);
    const dayPercentage = totalMinutes / 1440;
    const value = Math.floor(dayPercentage * 574);
    return value * 2 + 'px';
  }

}
