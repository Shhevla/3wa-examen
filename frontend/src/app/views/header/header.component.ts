import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { AuthService } from '../../shared/services/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean = false;
  public menuIsShow:boolean = false;
  public size = "0px";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  toggleMenu() 
  {
    this.menuIsShow = !this.menuIsShow;

    if(this.menuIsShow) {
      this.size = "300px";
    }
    else {
      this.size = "0px";
    }
  }

  logout() {
    this.router.navigate(['home']);
    this.authService.signOutUser();
  }
}