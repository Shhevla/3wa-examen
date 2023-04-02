import { Component, OnInit } from '@angular/core';
import { getDatabase, Database,DatabaseReference, get, ref, onValue, update} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { CallApiService } from 'src/app/shared/services/call-api.service';
import { Cabinet } from 'src/app/shared/models/cabinet.model';
import { tchatModel, tchatReceive } from 'src/app/shared/models/tchat.model';


@Component({
  selector: 'app-tchatbox',
  templateUrl: './tchatbox.component.html',
  styleUrls: ['./tchatbox.component.scss']
})
export class TchatboxComponent implements OnInit {
    displayMode: string = "cabinet"
    cabinets: Cabinet[] = []
    uid: string[] = [];
    path: string[] = [];
    database: Database = getDatabase()
    Databaseref: DatabaseReference | null = null
    value_cab : number = 0;
    msglist: tchatReceive[] = []
    sendMsg: string = "";
    fname: string = "";
    lname: string = "";
    chat: HTMLDivElement | null = null;
    chatButton: HTMLButtonElement | null = null;
    

    constructor(private api: CallApiService) { }  

    async ngOnInit() {
        await this.api.allCabinetWork(getAuth().currentUser?.uid!).then(data => {this.cabinets! = data[0] as Cabinet[], this.uid= data[1] as string[], this.path  = data[2] as string[]});
        for (let i = 0; i < this.uid.length; i++) {
            this.msglist.push(new tchatReceive([], [], [new tchatModel('', '', '', '', '')]))
            onValue(ref(this.database, "message/" + this.uid[i]), (snapshot) => {
                this.msglist[i] = snapshot.val();
            });
        }
        if (sessionStorage.getItem('tchatOpen') === 'true') {
            console.log('tchatOpen')
            this.change();
        }
    }
    ngAfterViewInit() {
        this.chat = document.querySelector<HTMLDivElement>('.chat-container');
        this.chatButton = document.querySelector<HTMLButtonElement>('.button-transition');
    }

    getOutputVal(displayMode: string) {
        this.displayMode = displayMode;
    }
    

    setDisplayMode(mode: string, index: number) {
        if (this.msglist[index] !== null && this.msglist[index].workerNotif[this.msglist[index].worker.indexOf(getAuth().currentUser?.uid!)] === 1) {
            this.msglist[index].workerNotif[this.msglist[index].worker.indexOf(getAuth().currentUser?.uid!)] = 0;
            update(ref(this.database, "message/" + this.uid[index]), this.msglist[index]);
        }
        this.value_cab = index;
        this.displayMode = mode;
    }

    change() {
        console.log("change");
        if (this.chat) {
            console.log("change2");
            sessionStorage.setItem('tchatOpen', 'true');
            this.chat.classList.toggle('open');
            this.chatButton?.classList.toggle('close');
        }
    }

    reverseChange() {
        console.log("change");
        if (this.chat) {
            console.log("change2");
            sessionStorage.setItem('tchatOpen', 'false'); // changer à false
            this.chat.classList.remove('open'); // supprimer la classe 'open'
            this.chatButton?.classList.remove('close'); // supprimer la classe 'close'
        }
    }

    searchIndex(index:number) {
        for (let i = 0; i < this.msglist[index].worker.length; i++) {
            if (this.msglist[index].worker[i] === getAuth().currentUser?.uid) {
                return i;
            }
        }
        return index;
    }
}
