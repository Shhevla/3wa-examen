import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, OAuthProvider, sendEmailVerification  } from "firebase/auth";
import { Observable, throwError } from 'rxjs';
import { UserProfile, connection, Pending } from '../models/profile.model';
import { Cabinet, Praticiens } from '../models/cabinet.model';
import { environment } from 'src/environments/environment';
import { jsonEval } from '@firebase/util';
import { MessagesService } from './messages.service';
import { Member } from '../models/member.model';
import { tchatModel } from '../models/tchat.model';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

  test : UserProfile | null = null;
  allcabinet: Cabinet[] | undefined;

  constructor(private http : HttpClient) { }

  handleError() {
    let errorMessage = 'Error Occured';
    return throwError(() => errorMessage);
  }

//                  Login                     //

  async getLoginData(){
    return new Promise<UserProfile>((resolve, reject) => {
      if (getAuth().currentUser) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<UserProfile>(environment.back_url + `profile/getprofile`, {uid : getAuth().currentUser?.uid}, {headers}).subscribe(data => {
        if (data) {
          resolve (data);
        }
          reject(null);
      })
    }
  })
}

async updateLoginData(user: UserProfile): Promise<connection> {
    return new Promise<connection>((resolve, reject) => {
      if (getAuth().currentUser) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `profile/updateprofile`, {uid : getAuth().currentUser?.uid, user: user}, {headers}).subscribe(data => {
        if (data) {
          resolve (data);
        }
        reject(null);
      })
    }
  })
}

async verifyAccount(){
    return new Promise<connection>((resolve, reject) => {
      if (getAuth().currentUser) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `profile/verifyaccount`, {uid : getAuth().currentUser?.uid}, {headers}).subscribe(data => {
        if (data) {
          resolve (data);
        }
          reject(null);
      })
    }
  })
}

async inscription(user: UserProfile) {
    const user2 = getAuth().currentUser;
    return new Promise<connection>((resolve, reject) => {
    if (user2) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `profile/createaccount`, {uid : getAuth().currentUser?.uid, json : user}, {headers}).subscribe(data => {
        if (data) {
          resolve (data);
        }
          reject(null);
      })
    }
})
}

//                  Cabinet                     //

  async createCabinet(uid: string, json: Cabinet) {
    return new Promise<Cabinet>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<Cabinet>(environment.back_url + `cabinet/createcabinet`, {uid: uid, json: json}, {headers}).subscribe(data => {
            resolve(data);
      })
    })
  }

  async allCabinetWork(uid: string){
    return new Promise<Array<Cabinet[] | string[]>>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<Array<Cabinet[] | string[]>>(environment.back_url + `cabinet/getallcabinetwork`, {uid: uid}, {headers}).subscribe(data => {
            resolve(data);
      })
    })
  }


  async allWorker(pract: Praticiens[]){
    return new Promise<Array<UserProfile[] | string[]>>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<Array<UserProfile[] | string[]>>(environment.back_url + `cabinet/getallworker`, {pract: pract}, {headers}).subscribe(data => {
            resolve(data);
      })
    })
  }

  async addWorker(IdCab: string, PathCab: string, email: string) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `cabinet/addWorker`, {id: IdCab, path: PathCab, email: email}, {headers}).subscribe(data => {
        if (data.response != "no User") {
          resolve (data);
        }
          reject(data);
      })
    })
  }

  async delWorker(IdCab: string, PathCab: string,  practId: String) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `cabinet/delworker`, {id: IdCab, path: PathCab, practId: practId}, {headers}).subscribe(data => {
        if (data.response != "no User") {
          resolve (data);
        }
          reject(data);
      })
    })
  }

  async updateCabinet(id: string, PathCab: string, json : Cabinet) {
    return new Promise<Cabinet>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<Cabinet>(environment.back_url + `cabinet/updatecabinet`, {id: id, path: PathCab, json: json}, {headers}).subscribe(data => {
          resolve (data); 
      })
    })
  }

  async readCabinet(IdCab: string, PathCab: string) {
    return new Promise<Cabinet>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<Cabinet>(environment.back_url + `cabinet/getcabinet`, {id: IdCab, path: PathCab}, {headers}).subscribe(data => {
          resolve (data); 
      })
    })
  }

  async inviteWorker (email: string, id: string, path: string) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `cabinet/pendinginvitation`, {email: email, id: id, path: path}, {headers}).subscribe(data => {
          resolve (data); 
      })
    })
  }

  async acceptInvitation (notification :Pending, email : string) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `cabinet/pendingaccept`, {notification :notification, email: email}, {headers}).subscribe(data => {
          resolve (data); 
      })
    })
  }

  async cancelInvitation (notification :Pending, email : string) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `cabinet/pendingcancel`, {notification :notification, email: email}, {headers}).subscribe(data => {
          resolve (data); 
      })
    })
  }

  async dlVerif (uid: string, memberIndex: string, cabId: string, member: Member, type: string) {   
    
    return await new Promise<connection>( (resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `upload/uploadfile`, {uid: uid, memberIndex: memberIndex, cabId: cabId, member: member, type: type}, {headers}).subscribe(data => {
        resolve (data); 
      })
    })
  }


  async documentSendNotif (indexMember: number, id: string, uid: string) {
      return new Promise<connection>((resolve, reject) => {
          const headers = new HttpHeaders().set("Content-Type", "application/json");
          this.http.post<connection>(environment.back_url + `cabinet/notifdocumentsend`, {indexMember:indexMember  , id: id, uid: uid}, {headers}).subscribe(data => {
            resolve (data); 
        })
      })
    }
 
  async getrole (uidCab: String) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `cabinet/roleget`, {uid: getAuth().currentUser?.uid, uidCab: uidCab}, {headers}).subscribe(data => {  
        resolve (data); 
      })
    })
  }

  async removeCab (uidCab: String, path: String) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `cabinet/deletecabinet`, {uid: getAuth().currentUser?.uid, uidCab: uidCab, path: path}, {headers}).subscribe(data => {  
        resolve (data); 
      })
    })
  }
  // TCHAT
  async sendMsgtoFire (uidCab: String, txt: tchatModel) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `tchat/sendmsg`, {uid: getAuth().currentUser?.uid, uidCab: uidCab, txt: txt}, {headers}).subscribe(data => {  
        resolve (data); 
      })
    })
  }

  async sendModification (uidCab: String, txt: tchatModel, index: number) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `tchat/modifmessage`, {uid: getAuth().currentUser?.uid, uidCab: uidCab, txt: txt, index: index}, {headers}).subscribe(data => {  
        resolve (data);
      })
    })
  }

  async sendDelete (uidCab: String,  index: number) {
    return new Promise<connection>((resolve, reject) => {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        this.http.post<connection>(environment.back_url + `tchat/deletemessage`, {uid: getAuth().currentUser?.uid, uidCab: uidCab, index: index}, {headers}).subscribe(data => {  
        resolve (data);
      })
    })
  }
}




    

/*       - <span class="dropdown-container">
            <span class="dropdown" *ngFor="let location of allCabinet; let index = index" ><button class="dropdown-button" (click)="onChangeLocation(allId[index])">{{location.name}}</button></span>
        +<span class="dropdown-container" >
           <span class="dropdown" *ngFor="let location of allCabinet; let index = index">
            <button *ngIf="location != undefined"class="dropdown-button" (click)="onChangeLocation(allId[index])">{{location.name}}</button>
            </span> */