import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { getDatabase, Database,DatabaseReference, get, ref, onValue, update, serverTimestamp} from 'firebase/database';
import { getAuth } from 'firebase/auth';

import { CallApiService } from 'src/app/shared/services/call-api.service';
import { Cabinet } from 'src/app/shared/models/cabinet.model';
import { tchatModel, tchatReceive } from 'src/app/shared/models/tchat.model';

@Component({
  selector: 'app-tchatboxmessage',
  templateUrl: './tchatboxmessage.component.html',
  styleUrls: ['./tchatboxmessage.component.scss']
})
export class TchatboxmessageComponent implements OnInit {

    @Input() cabinet: Cabinet | null = null;
    @Input() msglist: tchatReceive| null = null;
    @Input() uidCab: string = "";
    @Output() displayChange = new EventEmitter<string>();
    uid: string = getAuth().currentUser?.uid!;
    sendMsg: string = "";
    fname: string = "";
    lname: string = "";
    lastDate: string = "";
    popupVisible: boolean = false;
    selectedMessage: tchatModel | null = null;
    indexSelectedMessage: number = 0;

    constructor(private api: CallApiService) { }  
    
    async ngOnInit() {
        this.api.getLoginData().then(data => {this.fname = data.information.fname; this.lname = data.information.lname})
        var messageContainer = document.querySelector('.message-container');
        if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }

    ngOnChanges(msglist: SimpleChange) {
        var container = document.querySelector('.message-container');
        if (container) {
            container.scrollTop = container.scrollHeight;
            console.log('scroll');
        }
    }

    sendToParent() {
        this.displayChange.emit('cabinet')
    }

    sendingMessage() {
        const date = new Date();
        const formattedDate = date.toLocaleDateString('fr-FR');
        const formattedTime = date.toLocaleTimeString('fr-FR', {hour: 'numeric', minute: 'numeric'});
        let msg : tchatModel = new tchatModel(this.sendMsg, `${this.fname} ${this.lname}`, formattedDate, formattedTime,getAuth().currentUser?.uid!)
        this.api.sendMsgtoFire(this.uidCab, msg);
    }

    showPopup(msg: tchatModel) {
        if (msg.uid == getAuth().currentUser?.uid!) {
            this.indexSelectedMessage = this.msglist?.message.indexOf(msg)!;
            this.selectedMessage = msg;
            this.popupVisible = !this.popupVisible;
        }
    }
}
