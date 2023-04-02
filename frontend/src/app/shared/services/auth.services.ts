import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { CallApiService } from "./call-api.service";
import { User } from "firebase/auth";
@Injectable()
export class AuthService {

    constructor(private router: Router, private api: CallApiService) {}

    createNewUser(email:string, password:string): Promise<User>{
        return new Promise(
            (resolve,reject) => {
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, email, password)
                .then(
                    (user) => {
                        resolve(user.user);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signInUser(email:string, password:string) {
        return new Promise(
            (resolve,reject) => {
                const auth = getAuth();
                signInWithEmailAndPassword(auth, email, password)
                .then(
                    () => {
                        resolve("y");
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signWithGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((auth) => {
            this.api.verifyAccount().then((data) => {
            if(data.response == "no account") {
                this.router.navigate(['/inscription']);
            } else {
                this.router.navigate(['/location']); 
            }
});
            //this.router.navigate(['/location']);
          });
    }

    signOutUser() {
        signOut(getAuth()).then(() => {
            this.router.navigate(['/home']);
        });
    }
}