import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/shared/models/appointment-model';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { MembersService } from 'src/app/shared/services/members.service';
import { getRandomColor } from 'src/app/shared/utils';
import { CalendarComponent } from 'src/app/views/board-manager/calendar-manager/month-calendar/calendar.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {
  ngOnInit(): void {
    
  }

//   appointmentForm!: FormGroup;

//   constructor(private formBuilder: FormBuilder, private calendarService: CalendarService, private memberService: MembersService) { }

//   ngOnInit(): void {
//     this.initForm();
//   }
  
//   // initialize form
//   initForm(dateVal: string = "", startTimeVal: string = "", endTimeVal: string = "",) {
    
//     this.appointmentForm = this.formBuilder.group({
//       title: ["", Validators.required],
//       date: [dateVal, Validators.required],
//       startTime: [startTimeVal, Validators.required],
//       endTime: [endTimeVal, Validators.required],
//       description: [""],
//     })
//   }
  
//  // take value from form
//   getAppointment() {
//     const obj = {
//       title : this.appointmentForm.get("title")!.value,
//       date : this.appointmentForm.get("date")!.value,
//       startTime : this.appointmentForm.get("startTime")!.value,
//       endTime : this.appointmentForm.get("endTime")!.value,
//       description : this.appointmentForm.get("description")?.value,
//     }

//     this.createAppointment(obj)
//   }

//   // create an appointment (needs to be redone)
//   createAppointment(obj :any) {

//     const appointment = new Appointment ("???", "???", obj.title,
//       obj.startTime, obj.endTime,
//       obj.description, getRandomColor(), obj.date,
//       50, 50,
//       this.calendarService.createTimeToDsplay(obj.startTime), this.calendarService.createTimeToDsplay(obj.endTime),
//       "temporary"
//     );
//     this.calendarService.createFirestoreDB(appointment, this.memberService.cityLocation, appointment.title); 
//   }


//   @Output("hideModal") modalToHide: EventEmitter<any> = new EventEmitter();

//   hideModal() {
//     this.modalToHide.emit();
//   }

}