import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/shared/models/member.model';
import { MembersService } from 'src/app/shared/services/members.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { MembersComponent } from '../members.component';

@Component({
  selector: 'app-modify-member',
  templateUrl: './modify-member.component.html',
  styleUrls: ['./modify-member.component.scss']
})
export class ModifyMemberComponent implements OnInit  {

  selectedMember?: Member;
  updateMemberForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private membersService: MembersService, 
              private memberComponent: MembersComponent, private messageService: MessagesService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.updateMemberForm = this.formBuilder.group({
      firstName: [this.selectedMember?.firstName, Validators.required],
      lastName: [this.selectedMember?.lastName, Validators.required],
      email: [this.selectedMember?.email, Validators.required],
      phone: [this.selectedMember?.phoneNumber, Validators.required],
      adress: [this.selectedMember?.adress, Validators.required],
      comments: [this.selectedMember?.comments, Validators.required]
    })
  }

  saveMember() {

    this.selectedMember!.firstName = this.updateMemberForm.get("firstName")!.value;
    this.selectedMember!.lastName = this.updateMemberForm.get("lastName")!.value;
    this.selectedMember!.email = this.updateMemberForm.get("email")!.value;
    this.selectedMember!.phoneNumber = this.updateMemberForm.get("phone")!.value;
    this.selectedMember!.adress = this.updateMemberForm.get("adress")!.value;
    // this.selectedMember!.invoice = this.updateMemberForm.get("invoice")!.value;
    // this.selectedMember!.vitalCard = this.updateMemberForm.get("vitalCard")!.value;
    // this.selectedMember!.mutualCard = this.updateMemberForm.get("mutualCard")!.value;
    // this.selectedMember!.prescription = this.updateMemberForm.get("prescription")!.value;
    this.selectedMember!.comments = this.updateMemberForm.get("comments")!.value;

    this.membersService.saveMembers();
    this.hideModal.emit();
    this.messageService.displayMessage("Member updated", "success");

  }
  
  @Output() hideModal: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
