import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"
import { BnNgIdleService } from 'bn-ng-idle';
import { getAuth } from 'firebase/auth';
import { AuthService } from './shared/services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bagas-sante-web';
  constructor(private bnIdle: BnNgIdleService, private authService: AuthService, private router: Router) {
    const firebaseConfig = {
        apiKey: "AIzaSyCTIh1DEYjrh9zs6U0XZ4vZSdYM4QjOKkA",
        authDomain: "bagas-sante-63b61.firebaseapp.com",
        databaseURL: "https://bagas-sante-63b61-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "bagas-sante-63b61",
        storageBucket: "bagas-sante-63b61.appspot.com",
        messagingSenderId: "43730415218",
        appId: "1:43730415218:web:631fa5e339245b75df9ceb",
        measurementId: "G-XYNLJ9BH6X"
};
    this.bnIdle.startWatching(3600).subscribe((res) => {
        if (getAuth().currentUser?.uid) {
            this.router.navigate(['home']);
            this.authService.signOutUser();
        }
    })
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const storage = getStorage(app);
  }
}
