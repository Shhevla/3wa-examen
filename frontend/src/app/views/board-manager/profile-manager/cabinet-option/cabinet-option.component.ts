import { Component, Input, OnInit } from '@angular/core';
import { Cabinet, Praticiens } from 'src/app/shared/models/cabinet.model';
import { UserProfile } from 'src/app/shared/models/profile.model';
import { CallApiService } from 'src/app/shared/services/call-api.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-cabinet-option',
  templateUrl: './cabinet-option.component.html',
  styleUrls: ['./cabinet-option.component.scss']
})
export class CabinetOptionComponent implements OnInit {
    cabinet : Cabinet | undefined;
    id : String | undefined;
    path: String | undefined;
    selectedCabinet: Cabinet | undefined;
    worker: UserProfile[] = [];
    workerId : String[] = []
	pendingWorker: String[] | undefined;
    run : boolean = false;  
    addWorker: string = "";
    index: number = 0;
    workerad: boolean = false;
	selectedWorker: String | undefined;
    role = [
		{id: 1, name: "Titulaire"},
		{id: 2, name: "Colaborateur"},
        {id: 3, name: "Assistant"},
        {id: 4, name: "Remplacent"},
   	];

	@Input() cabinetData: Cabinet | undefined;
	@Input() cabinetId: String | undefined;
	@Input() cabinetPath: String | undefined;

	constructor(private api: CallApiService, private profileComponent: ProfileComponent, private message: MessagesService) { }
	
	ngOnInit() {
	}
	async ngAfterViewInit() {
		this.cabinet = this.cabinetData;
		this.id = this.cabinetId;
		this.path = this.cabinetPath;
		this.pendingWorker = undefined;
		this.selectedCabinet = this.cabinet;

		if (this.id != "") {
			await this.api.readCabinet(this.id as string, this.path as string).then((data) => {
				this.cabinet = data;
				if (this.cabinet?.invitation) {
					if (this.cabinet?.invitation.length == 0) {
						this.pendingWorker = undefined;
					} else
						this.pendingWorker = this.cabinet?.invitation;
				}
			})
			this.api.allWorker(this.cabinet?.practitioners as Praticiens[]).then((data) => {
				this.worker = data[0] as UserProfile[];
				this.workerId = data[1] as String[];
				this.run = true;
			})
		}
	}

	async inviteWorker() {
		const path = [this.path, this.id];
        
		await this.api.inviteWorker( this.addWorker, this.id as string, this.path as string).then((data) => {
			if (data.response == "invitation cancel") {
				this.message.displayMessage("l'adresse mail n'existe pas", "reject");
			} else if(data.response == "full cabinet") {
				this.message.displayMessage("le cabinet ne peut pas contenir plus de 10 praticiens ou invitations", "information");
			} else if(data.response == "already here") {
				this.message.displayMessage(`${this.addWorker} est déjà présent ou inviter dans le cabinet`, "information");
			} else {
				this.message.displayMessage("Invitation envoyée", "resolve");
			}
		});
		await this.ngAfterViewInit();
	}

	async delWorker(workerId: String) {
		await this.api.delWorker(this.id as string, this.path as string , workerId as string).then((data) => {
			this.message.displayMessage(data.response, "resolve");
		});
		
		await this.ngAfterViewInit();
	}

	async addModif() {
		await this.api.updateCabinet(this.id as string, this.path as string, this.cabinet as Cabinet);
	}

	showDelWorkerModal(workerId: String) {
		this.profileComponent.showDelWorkerModal('modal-container', 'modal-background', workerId);
	}

	showDelCabinetModal() {
		this.profileComponent.showDelCabinetModal('cabinet-modal-container', 'cabinet-modal-background', this.id as String, this.path as String);
	}
}