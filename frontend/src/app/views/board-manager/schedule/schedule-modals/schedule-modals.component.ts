import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/shared/models/appointment-model';
import { CalendarService } from 'src/app/shared/services/calendar.service';

@Component({
  selector: 'app-schedule-modals',
  templateUrl: './schedule-modals.component.html',
  styleUrls: ['./schedule-modals.component.scss']
})
export class ScheduleModalsComponent implements OnInit {
    
    constructor(private calendarService: CalendarService, private router: Router) {}

    cabinetId = this.router.url.split("/", 3)[2];
    appointmentForm = new FormGroup({
        basicInfos: new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required),
            mail: new FormControl('', [Validators.required, Validators.email]),
            address: new FormControl('', Validators.required),
            zipCode: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            date: new FormGroup({
                day: new FormControl('', Validators.required),
                startTime: new FormControl('', Validators.required),
                endTime: new FormControl('', Validators.required)
            }),
            reccurences: new FormGroup({
                daysList: new FormGroup({
                    lun: new FormControl(false),
                    mar: new FormControl(false),
                    mer: new FormControl(false),
                    jeu: new FormControl(false),
                    ven: new FormControl(false),
                    sam: new FormControl(false),
                    dim: new FormControl(false)
                }),
                startDate: new FormControl('', Validators.required),
                endDate: new FormControl('', Validators.required)
            }),
            notes: new FormControl('')
        }),
        practitioner: new FormControl('', Validators.required)
    });
  
    @Input() visible: boolean = false;
    @Output() popupClosed = new EventEmitter();

    ngOnInit(): void {
    }

    hideModal() {
        this.popupClosed.emit();
    }

    onSubmit() {
        this.createAppointment();
    }

    createAppointment() {
        const appointment: Appointment = {
            basicInfos: {
                firstName: this.appointmentForm.get('basicInfos.firstName')?.value,
                lastName: this.appointmentForm.get('basicInfos.lastName')?.value,
                phone: this.appointmentForm.get('basicInfos.phone')?.value,
                mail: this.appointmentForm.get('basicInfos.mail')?.value,
                address: this.appointmentForm.get('basicInfos.address')?.value,
                zipCode: this.appointmentForm.get('basicInfos.zipCode')?.value,
                city: this.appointmentForm.get('basicInfos.city')?.value,
            },
            date: {
                day: this.appointmentForm.get('basicInfos.date.day')?.value,
                startTime: this.appointmentForm.get('basicInfos.date.startTime')?.value,
                endTime: this.appointmentForm.get('basicInfos.date.endTime')?.value
            },
            reccurences: {
                daysList: [
                    this.appointmentForm.get('basicInfos.reccurences.daysList.lun')?.value,
                    this.appointmentForm.get('basicInfos.reccurences.daysList.mar')?.value,
                    this.appointmentForm.get('basicInfos.reccurences.daysList.mer')?.value,
                    this.appointmentForm.get('basicInfos.reccurences.daysList.jeu')?.value,
                    this.appointmentForm.get('basicInfos.reccurences.daysList.ven')?.value,
                    this.appointmentForm.get('basicInfos.reccurences.daysList.sam')?.value,
                    this.appointmentForm.get('basicInfos.reccurences.daysList.dim')?.value
                ],
                startDate: this.appointmentForm.get('basicInfos.reccurences.startDate')?.value,
                endDate: this.appointmentForm.get('basicInfos.reccurences.endDate')?.value
            },
            notes: this.appointmentForm.get('basicInfos.notes')?.value,
            practitioner: this.appointmentForm.get('practitioner')?.value
        }

        console.log(appointment);
        this.calendarService.createAppointment(appointment, this.cabinetId)
    }
}
