import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tchatModel } from 'src/app/shared/models/tchat.model';
import { CallApiService } from 'src/app/shared/services/call-api.service';

@Component({
  selector: 'app-tchatbox-popup',
  templateUrl: './tchatbox-popup.component.html',
  styleUrls: ['./tchatbox-popup.component.scss']
})
export class TchatboxPopupComponent implements OnInit {

    @Output() popupClosed = new EventEmitter<boolean>();
    @Input() message: tchatModel | null = null;
    @Input() visible: boolean = false;
    @Input() index: number = 0;
    @Input() uidCab: string = "";
    displayOptions:string = "menu";

    constructor(private api: CallApiService) { }

    ngOnInit(): void {
    }

    activateModificationMessage() {
        this.api.sendModification(this.uidCab, this.message!, this.index);
        this.popupClosed.emit(true);
    }

    deleteMessage() {
        this.displayOptions = "delete";
    }
    modificationMessage() {
        this.displayOptions = "modification";
    }

    activateDeleteMessage() {
        console.log("delete");
        this.api.sendDelete(this.uidCab, this.index);
         this.popupClosed.emit(true);
    }

    returnToMenu() {
        this.displayOptions = "menu";
    }
    closePopup() {
        this.displayOptions = "menu";
        this.popupClosed.emit(true);
    }
}
