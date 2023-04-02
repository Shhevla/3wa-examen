import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/shared/services/call-api.service';
import { UserProfile, Information, subscription } from 'src/app/shared/models/profile.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.services';
import { Router } from '@angular/router';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { MessagesService } from 'src/app/shared/services/messages.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
    information: Information = new Information("","","","","","","","","","","")
    abo : subscription = new subscription("", "", "non abonner");
    account: UserProfile = new UserProfile (this.information, [], this.abo, "", []);
    inscriptionForm!: FormGroup;
    invalid: number = 0;
    count: number = 0;
    
    constructor(private callapi: CallApiService, private formBuilder: FormBuilder, 
                private authservice: AuthService, private router: Router, private message: MessagesService) { }

    ngOnInit(): void {
        this.initInscription();
    }

    initInscription() {
        this.inscriptionForm = this.formBuilder.group({
            Dname: [""],
            Fname: ["", Validators.required],
            Lname: ["", Validators.required],
            gender: [0],
            email: ["", Validators.required],
            adress: [""],
            birthday: [""],
            tel: [""],
            birth_location: [""],
            order: [""],
            order_city: [""],
            password:["", Validators.required],
            Cpassword:["", Validators.required],
        })
    }

    // form submission and verify password confirmation and error without the neccessary
    submission() {
        if (this.inscriptionForm.get("password")!.value != this.inscriptionForm.get("Cpassword")!.value) {
            this.invalid = 2;
        } else if (this.inscriptionForm.valid) {
            this.invalid = 0;
            this.fillValueInModel();
        } else {
            this.invalid = 1;
        }
    }

    // Take form value and create the user
    async fillValueInModel() {
        //const gender = this.inscriptionForm.get("gender")!.value;
        this.account.information.fname = this.inscriptionForm.get("Fname")!.value;
        this.account.information.lname = this.inscriptionForm.get("Lname")!.value;
        //this.account.information.adress = this.inscriptionForm.get("adress")!.value;
        //this.account.information.birth_location = this.inscriptionForm.get("birth_location")!.value;
        //this.account.information.birthday = this.inscriptionForm.get("birthday")!.value;
        //this.account.information.order = this.inscriptionForm.get("order")!.value;
        //this.account.information.tel =  this.inscriptionForm.get("order")!.value;
       // this.account.information.order_city = this.inscriptionForm.get("order_city")!.value;
        //this.account.information.dname = this.inscriptionForm.get("Dname")!.value;
        
        //if (gender == 1) {
        //    this.account.information.gender = "Femme";
        //} else if (gender == 0) {
        //    this.account.information.gender = "Homme";
        //} else 
        //    this.account.information.gender = "Non précisé";

        await this.authservice.createNewUser(this.inscriptionForm.get("email")!.value, 
        this.inscriptionForm.get("password")!.value).then((user) => { 
            if (user)
                sendEmailVerification(user);
        });

        this.authservice.signOutUser();
        this.router.navigate(['/']);
        this.message.displayMessage("Un email de vérification vous a été envoyé", "information");
        this.callapi.inscription(this.account);
    }       
}
