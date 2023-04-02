import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentNotification, Member } from 'src/app/shared/models/member.model';
import { MembersService } from 'src/app/shared/services/members.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {

  memberForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private membersService: MembersService,
              private message: MessagesService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.memberForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [0, Validators.required],
      invoice: [-1, Validators.required],
      vitalCard: [-1, Validators.required],
      mutualCard: [-1, Validators.required],
      prescription: [-1, Validators.required],
      phoneNumber: ["", Validators.pattern("^[0-9]*$")],
      email: [""],
      adress: [""],
      comments: [""],
    })
  }

  onSaveMember() {
    const firstName = this.memberForm.get("firstName")!.value;
    const lastName = this.memberForm.get("lastName")!.value;
    const gender = this.memberForm.get("gender")!.value;
    let invoice : number[] = [];
    invoice[0] = this.memberForm.get("invoice")!.value;
    const vitalCard = this.memberForm.get("vitalCard")!.value;
    const mutualCard = this.memberForm.get("mutualCard")!.value;
    const prescription = this.memberForm.get("prescription")!.value;
    const phoneNumber = this.memberForm.get("phoneNumber")?.value;
    const email = this.memberForm.get("email")?.value;
    const adress = this.memberForm.get("adress")?.value;
    const comments = this.memberForm.get("comments")?.value;

    if (firstName === "") {
      document.getElementById("error")!.innerHTML = "Il manque un nom de famille";
    } else {
      const documentNotification = new DocumentNotification(-1);
      const newMember = new Member(firstName, lastName, invoice, vitalCard, mutualCard, prescription, comments, gender, phoneNumber, email, adress, documentNotification);
      this.membersService.createNewMember(newMember);
      this.memberForm.reset();
      this.initForm();
      this.hideFormModal.emit();
      this.message.displayMessage(`Le membre ${firstName} a bien été ajouté`, "success");
    }
  }

  @Output() hideFormModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
