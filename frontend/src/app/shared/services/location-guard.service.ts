import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { UserProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class  LocationGuardService implements CanActivate {
    
    constructor(private router: Router,private http : HttpClient) { }
    check: string  = "nothing";
    first: string = "";
    canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(getAuth(), async (user) => {
                if(user) {
                   await new Promise<UserProfile>((resolve, reject) => {
                        if (getAuth().currentUser) {
                            const headers = new HttpHeaders().set("Content-Type", "application/json");
                            this.http.post<UserProfile>(environment.back_url + `profile/getprofile`, {uid : getAuth().currentUser?.uid}, {headers}).subscribe(data => {
                            let check : string = "nothing";
                            if (data) {
                                resolve (data);
                            }
                                reject(check);
                            })
                        }
                     }).then((data) => {
                        if (data.cabinet.length > 0){
                            this.first = data.cabinet[0].split("/")[3];
                            data.cabinet.forEach((element) => {
                                
                                if (element.split("/")[3] == state.url.split("/")[2]) {
                                    this.check = "ok";
                                }
                            })
                        }
                    });
                    if (state.url.split("/")[2] == "Region_1" || state.url.split("/")[2] =="undefined") {
                        this.router.navigate([`/board/${this.first}`, "calendar"]);
                        resolve(true)
                    }  
                    else if (this.check == "ok") {
                        resolve(true);
                    }else{
                        this.router.navigate(['/board']);
                        reject(false)
                    }
                } else {
                    this.router.navigate(['/board']);
                    reject(false);
                }
            })
        });
    }
}
