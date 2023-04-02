import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Practitioners } from 'src/app/shared/models/practitioner.model';
import { PractitionersService } from 'src/app/shared/services/practitioners.service';

@Component({
  selector: 'app-modify-practitioners',
  templateUrl: './modify-practitioners.component.html',
  styleUrls: ['./modify-practitioners.component.scss']
})
export class ModifyPractitionersComponent implements OnInit {

  selectedPractitioners?: Practitioners;
  updatePractitionerForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private practitionersService: PractitionersService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.updatePractitionerForm = this.formBuilder.group({
      firstName: [this.selectedPractitioners?.firstName, Validators.required],
      color: [this.selectedPractitioners?.color, Validators.required],
    })
  }

  savePractitioner() {

    this.selectedPractitioners!.firstName = this.updatePractitionerForm.get("firstName")!.value;
    this.selectedPractitioners!.color = this.updatePractitionerForm.get("color")!.value;

    this.practitionersService.savePractitioner();
  }

  deletePractitioner() {
    this.practitionersService.removePractitioner(this.selectedPractitioners!);
  }

}
