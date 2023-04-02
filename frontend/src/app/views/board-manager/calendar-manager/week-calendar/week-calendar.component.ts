import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html',
  styleUrls: ['./week-calendar.component.scss']
})
export class WeekCalendarComponent implements OnInit {

  globalDate: Date[] = [];
  globalDays: Array<number> = [];
  month: string = "Janvier";
  year: number = 2022;
  actualYear: number = new Date().getFullYear();
  actualMonth: number = new Date().getMonth();
  actualDay: number = new Date().getDay();

  ngOnInit(): void {
    this.fillBoard();
  }

  addMonth() {
    if (this.actualMonth == 11) {
      this.actualMonth = 0;
      this.actualYear += 1;
    } else {
      this.actualMonth += 1;
    }
    this.globalDays = [];
    this.fillBoard();
  }

  decreaseMonth() {
    if (this.actualMonth == 0) {
      this.actualMonth = 11;
      this.actualYear -= 1;
    } else {
      this.actualMonth -= 1;
    }
    this.globalDays = [];
    this.fillBoard();
  }

  getDaysInMonth(year: number, month: number) :Date[] {
    let date = new Date(Date.UTC(year, month, 1));
    let days = []
    while (date.getUTCMonth() === month) {
      days.push(new Date(date));
      this.globalDays.push(new Date(date).getDate())
      date.setUTCDate(date.getUTCDate() + 1);
  
    }
    return days;
  }

  getFirstDay(year: number, month: number) {
    if (month === 0) {
      month = 12;
      year -= 1;
    }

    for (let i = 0; new Date(year, month, i).getDay() >= 1; i--) {
      this.globalDate.unshift(new Date(year, month, i))
      this.globalDays.unshift(new Date(year, month, i).getDate())
    }
  }

  getLastDay(year: number, month: number) {
    if (month === 11) {
      month = 0;
      year += 1;
    } else {
      month += 1
    }

    for (let i = 1; new Date(year, month, i).getDay() != 1; i++) {
      this.globalDate.push(new Date(year, month, i))
      this.globalDays.push(new Date(year, month, i).getDate())
    }
  }

  fillBoard() {
    let year = this.actualYear;
    let month = this.actualMonth;
    this.year = year;
    this.month = this.getActualMonth(month);
    this.globalDate = this.getDaysInMonth(year, month)
    this.getFirstDay(year, month);
    this.getLastDay(year, month);
  }

  //? Need to change
  getActualMonth(month: number) :string {
    switch ( month ) {
      case 0:
        return "Janvier";
      case 1:
        return "Février";
      case 2:
        return "Mars";
      case 3:
        return "Avril";
      case 4:
        return "Mai";
      case 5:
        return "Juin";
      case 6:
        return "Juillet";
      case 7:
        return "Août";
      case 8:
        return "Septembre";
      case 9:
        return "Octobre";
      case 10:
        return "Novembre";
      case 11:
        return "Décembre";
      default:
        return "???";
   }
  }
}
