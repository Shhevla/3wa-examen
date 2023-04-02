import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { Observable } from "rxjs";
import { Cabinet } from '../models/cabinet.model';
import { UserProfile } from '../models/profile.model';
import { CabinetService } from "./cabinet.service";
import { CallApiService } from './call-api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(private router: Router, private cs: CabinetService, private api: CallApiService) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(getAuth(), async (user) => {
                let role: string = "";
                if (user && this.cs.getname()) {
                    await this.api.getrole(this.cs.getname()).then((data) => {role = data.response})
                    if (role === "Titulaire" || role === "Colaborateur") {
                         resolve(true);
                    } else {
                        this.router.navigate([`/board`]);
                        resolve(false)
                    }
                } else {
                    this.router.navigate([`/board`]);
                }
            })
        });
    }
}
