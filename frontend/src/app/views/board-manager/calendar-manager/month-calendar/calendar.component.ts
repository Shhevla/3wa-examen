import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/shared/models/appointment-model';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { MembersService } from 'src/app/shared/services/members.service';
import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],

})
export class CalendarComponent implements OnInit {

 constructor(/*private calendarService: CalendarService, private memberService: MembersService*/) {}

 ngOnInit(): void {
   
 }
//   globalDate: Date[] = [];
//   firstGlobalDays: Array<number> = [];
//   globalDays: Array<number> = [];
//   lastGlobalDays: Array<number> = [];
//   yearToShow: number = new Date().getFullYear();
//   monthToShow: string = this.getActualMonthToString(new Date().getMonth());
//   dayToShow: string[] = [this.getActualDayToString(new Date().getDay()), new Date().getDate().toString(), this.monthToShow];
  
//   actualYear: number = new Date().getFullYear();
//   actualMonth: number = new Date().getMonth();
  
//   appointments: Appointment[] = [];
//   appointmentsSubscription!: Subscription;
//   dateString: string = this.adaptDate(this.actualYear, this.actualMonth + 1, new Date().getDate());

//   firstHour: number = 7;
//   lastHour: number = 18;

//   ngOnInit(): void {
//     this.globalDate = [];
//     this.firstGlobalDays = [];
//     this.globalDays = [];
//     this.lastGlobalDays = [];
//     this.reloadAll();
//     this.fillBoard();
//     this.appointmentsSubscription = this.calendarService.appointmentsSubject.subscribe((appointment: Appointment[]) => {
//       this.appointments = appointment;
//     });
//     this.calendarService.getFirestoreDB(this.memberService.cityLocation);

//   }

//   getActualLine() {
//     if (72 / (this.lastHour -  this.firstHour) / 4 < 1.5) {
//       return 1.5;
//     }
//     return 72 / (this.lastHour -  this.firstHour) / 4
//   }

//   setLineSize() {
//     return this.getActualLine() + 'vh'
//   }

//   isAppointmentInRange(hours: string) {
//     let hour = parseInt(hours.split(':')[0]);
//     return hour >= this.firstHour && hour <= this.lastHour;
//   }

//   getActualAppointmentHeight(hours :string) {
//     let hour = parseInt(hours.split(':')[0]);
//     let minutes = parseInt(hours.split(':')[1]);
//     let height = (hour - this.firstHour) * this.getActualLine() * 4 + (minutes / 60) * 4 * this.getActualLine();
//     return height;
//   }

//   setAppointmentSize(startTime: string, endTime: string) {
//     let startHour = parseInt(startTime.split(':')[0]);
//     let startMinutes = parseInt(startTime.split(':')[1]);
//     let endHour = parseInt(endTime.split(':')[0]);
//     let endMinutes = parseInt(endTime.split(':')[1]);
//     let size = (endHour - startHour) * this.getActualLine() * 4 + (endMinutes / 60) * 4 * this.getActualLine() - (startMinutes / 60) * 4 * this.getActualLine();
    
//     return size;
//   }

//   setFirstHour(event: Event) {
//     this.firstHour = parseInt((event.target as HTMLInputElement).value);
//   }

//   setLastHour(event: Event) {
//     this.lastHour = parseInt((event.target as HTMLInputElement).value);
//   }

//   numSequence(n: number): Array<number> {
//     return Array(n);
//   }

//   reloadAll() {
//     this.appointments = [];
//   }

//   addMonth() {
//     if (this.actualMonth == 11) {
//       this.actualMonth = 0;
//       this.actualYear += 1;
//     } else {
//       this.actualMonth += 1;
//     }
//     this.globalDays = [];
//     this.firstGlobalDays = [];
//     this.lastGlobalDays = [];
//     this.fillBoard();
//   }

//   decreaseMonth() {
//     if (this.actualMonth == 0) {
//       this.actualMonth = 11;
//       this.actualYear -= 1;
//     } else {
//       this.actualMonth -= 1;
//     }
//     this.globalDays = [];
//     this.firstGlobalDays = [];
//     this.lastGlobalDays = [];
//     this.fillBoard();
//   }

//   getDaysInMonth(year: number, month: number) :Date[] {
//     let date = new Date(Date.UTC(year, month, 1));
//     let days = []
//     while (date.getUTCMonth() === month) {
//       days.push(new Date(date));
//       this.globalDays.push(new Date(date).getDate())
//       date.setUTCDate(date.getUTCDate() + 1);
  
//     }
//     return days;
//   }

//   getFirstDays(year: number, month: number) {
//     if (month === 0) {
//       month = 12;
//       year -= 1;
//     }

//     for (let i = 0; new Date(year, month, i).getDay() >= 1; i--) {
//       this.globalDate.unshift(new Date(year, month, i))
//       this.firstGlobalDays.unshift(new Date(year, month, i).getDate())
//     }
//   }

//   getLastDays(year: number, month: number) {
//     if (month === 11) {
//       month = 0;
//       year += 1;
//     } else {
//       month += 1
//     }

//     for (let i = 1; new Date(year, month, i).getDay() != 1; i++) {
//       this.globalDate.push(new Date(year, month, i))
//       this.lastGlobalDays.push(new Date(year, month, i).getDate())
//     }
//   }

//   fillBoard() {
//     let year = this.actualYear;
//     let month = this.actualMonth;
//     this.yearToShow = year;
//     this.monthToShow = this.getActualMonthToString(month);
//     this.globalDate = this.getDaysInMonth(year, month)
//     this.getFirstDays(year, month);
//     this.getLastDays(year, month);
//   }

//   //? Need to change
//   getActualMonthToString(month: number) :string {
//     switch ( month ) {
//       case 0:
//         return "Janvier";
//       case 1:
//         return "Février";
//       case 2:
//         return "Mars";
//       case 3:
//         return "Avril";
//       case 4:
//         return "Mai";
//       case 5:
//         return "Juin";
//       case 6:
//         return "Juillet";
//       case 7:
//         return "Août";
//       case 8:
//         return "Septembre";
//       case 9:
//         return "Octobre";
//       case 10:
//         return "Novembre";
//       case 11:
//         return "Décembre";
//       default:
//         return "???";
//    }
//   }

//   getActualDayToString(dayValue: number): string {
//     switch ( dayValue ) {
//       case 0:
//         return "Dimanche";
//       case 1:
//         return "Lundi";
//       case 2:
//         return "Mardi";
//       case 3:
//         return "Mercredi";
//       case 4:
//         return "Jeudi";
//       case 5:
//         return "Vendredi";
//       case 6:
//         return "Samedi";
//       default:
//         return "???";
//    }
//   }

//   mouseMoved(hour: number, minutesString: string) {
//     let time = "00:00";
//     if (hour <= 9)
//       time = `0${hour}${minutesString}`;
//     else 
//       time = `${hour}${minutesString}`;
    
//     this.showSpecificModal('appointment-form-modal','appointment-form-modal-back',time);
//   }

//   showLastMonth(dayValue: number) {
//     this.decreaseMonth()
//     this.showDay(dayValue);
//   }

//   showNextMonth(dayValue: number) {
//     this.addMonth()
//     this.showDay(dayValue);
//   }

//   showDay(dayValue: number) {
//     this.dayToShow = [this.getActualDayToString(new Date(this.actualYear, this.actualMonth, dayValue).getDay()), dayValue.toString(), this.monthToShow];
//     this.dateString = this.adaptDate(this.actualYear, this.actualMonth + 1, dayValue);
//   }

//   stringToInt(string: string) {
//     let value = parseInt(string)
//     return value;
//   }

//   getActualDay(value: number): string {
//     return this.adaptDate(this.actualYear, this.actualMonth + 1, value);
//   }

//   adaptDate(year: string | number, month: string | number, day: string | number ) :string {

//     if (month <= 9)
//       month = `0${month}`;
//     if (day <= 9)
//       day = `0${day}`;

//     return `${year}-${month}-${day}`
//   }

//   // Appointments 

//   deleteAppointment(title: string, appointment :Appointment) {
//     this.calendarService.deleteAppointment(this.memberService.cityLocation, title, appointment)
//   }


//   // modal

//   showModal(modalIndex: string, backgroundIndex: string) {
//     let modal = document.getElementById(backgroundIndex);
//     let modalContent = document.getElementById(modalIndex);
//     if(modal && modalContent) {
//       modal.style.display = "block";
//       modalContent.style.display = "flex";
//     }
//   }

//   hideModal(modalIndex: string, backgroundIndex: string) {
//     let modal = document.getElementById(backgroundIndex);
//     let modalContent = document.getElementById(modalIndex);
//     if(modal && modalContent) {
//       modal.style.display = "none";
//       modalContent.style.display = "none";
//     }
//   }

//   @ViewChild(CalendarModalComponent)
//   private childCalendar = {} as CalendarModalComponent;

//   showSpecificModal(modalIndex: string, backgroundIndex: string, selectedTime: string){
//     let modal = document.getElementById(backgroundIndex);
//     let modalContent = document.getElementById(modalIndex);
//     if(modal && modalContent) {
//       modal.style.display = "block";
//       modalContent.style.display = "flex";
//       this.childCalendar.initForm(this.dateString, selectedTime, this.getEndTime(selectedTime));
//     }
//   }

//   getEndTime(selectedTime: string):string {
//     let hours = parseInt(`${selectedTime.split(":",2)[0]}`)
//     let minutes = parseInt(`${selectedTime.split(":",2)[1]}`)
//     let time = "00:00"

//     if (minutes === 45) {
//       hours = hours + 1;
//       minutes = 0;
//     }
//     else 
//       minutes = minutes + 15

//     if (hours === 24)
//       hours = 0;

//     if (hours <= 9 && minutes <= 9) 
//       time = `0${hours}:0${minutes}`;
//     else if (hours <= 9)
//       time = `0${hours}:${minutes}`;
//     else if (minutes <= 9)
//       time = `${hours}:0${minutes}`;
//     else 
//       time = `${hours}:${minutes}`;

//     return time;
//   }
}