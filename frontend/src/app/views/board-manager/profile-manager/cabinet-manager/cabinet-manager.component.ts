import { Component, Input, OnInit } from '@angular/core';
import { getAuth, reload } from 'firebase/auth';
import { Cabinet, Praticiens } from 'src/app/shared/models/cabinet.model';
import { CallApiService } from 'src/app/shared/services/call-api.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { getRandomColor } from 'src/app/shared/utils';
@Component({
  selector: 'app-cabinet-manager',
  templateUrl: './cabinet-manager.component.html',
  styleUrls: ['./cabinet-manager.component.scss']
})
export  class CabinetManagerComponent implements OnInit {
   praticien: Praticiens = new Praticiens("", "", "", "", "");
   allPrac: Praticiens[] = [];
   cabinet: Cabinet = new Cabinet(this.allPrac, "", "", [])
  constructor(private api: CallApiService, private message: MessagesService) { }

  async ngOnInit() {
    
  }
  checkValidity() {
    if (this.cabinet.name != "")
        return (true);
    return(false);
  }

  async initCreationCabinet() {

      await this.api.getLoginData().then((data) => {this.praticien.firstName = data.information.fname ; 
        this.praticien.lastName = data.information.lname;
        this.cabinet.path = "Cabinets_manager/database/" + data.cabinet_manager + "/";
      })
      this.praticien.role = "Titulaire";
      this.praticien.id = getAuth().currentUser?.uid;
      this.praticien.color = getRandomColor();
      this.allPrac.push(this.praticien);
      await this.api.createCabinet(getAuth().currentUser?.uid!, this.cabinet).then(() => {
        this.message.displayMessage("Cabinet créé avec succès", "resolve");
      })
      location.reload();
  }
}
