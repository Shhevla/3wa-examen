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
      apiKey: "AIzaSyC_oQY_vWLvaleuC92WJzsaGjQuFryvqaI",
      authDomain: "wa-test-bagas.firebaseapp.com",
      databaseURL: "https://wa-test-bagas-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "wa-test-bagas",
      storageBucket: "wa-test-bagas.appspot.com",
      messagingSenderId: "892215932810",
      appId: "1:892215932810:web:40ef5d067c0244b1bbba73",
      measurementId: "G-PKME64FC30"
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
