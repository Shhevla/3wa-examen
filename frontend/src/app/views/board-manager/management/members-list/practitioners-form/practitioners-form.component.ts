import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Practitioners } from 'src/app/shared/models/practitioner.model';
import { PractitionersService } from 'src/app/shared/services/practitioners.service';

@Component({
  selector: 'app-practitioners-form',
  templateUrl: './practitioners-form.component.html',
  styleUrls: ['./practitioners-form.component.scss']
})
export class PractitionersFormComponent implements OnInit {

  practitionerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private practitionersService: PractitionersService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.practitionerForm = this.formBuilder.group({
      firstName: ["", Validators.required]
    })
  }

  onSavePractitioner() {

    if (this.practitionersService.practitioners.length >= 5) {
      return;
    }

    const firstName = this.practitionerForm.get("firstName")!.value;

    if (firstName === "") {
      document.getElementById("error")!.innerHTML = "Il manque un nom de famille";
    } else {
      const newPractitioner = new Practitioners(firstName, "", this.makeRandomHexColor());
      this.practitionersService.createPractitioner(newPractitioner);
    }
  }

  makeRandomHexColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
    }
    return color;
  }
}
