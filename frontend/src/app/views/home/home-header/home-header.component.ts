import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/shared/services/auth.services';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  isAuth: boolean = false;
  public menuIsShow:boolean = false;
  public size = "0px";

  constructor(public authService: AuthService, private router: Router) { }

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

  // onWindowScroll(e: Event) {
  //   let header = document.getElementById("home-header");

  //   if(header) {
  //     if (window.pageYOffset >= 1 || this.menuIsShow === true) {
  //       header.style.background = "rgb(35, 35, 45)";
  //     } else {
  //       header.style.background = "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.85))";
  //     }
  //   }
  // }

  showSignUp() {
    let container = document.getElementById("sign-up-container");
    let headerButton = document.getElementById("sign-up-button");
    if(container) {
      container.style.display = "block"

      document.addEventListener('click', function(e){

        if(container) {
          if (!container.contains(e.target as Node) && e.target !== headerButton){
            container.style.display = "none";
          }
        }
      });
    }
  }

  showSignIn() {
    let container = document.getElementById("sign-in-container");
    let headerButton = document.getElementById("sign-in-button");
    let menuButton = document.getElementById("menu-sign-in-button");

    if(container) {
      container.style.display = "block";


      document.addEventListener('click', function(e){

        if(container) {
          if (!container.contains(e.target as Node) && e.target !== headerButton && e.target !== menuButton){
            container.style.display = "none";
          }
        }
      });
    }
  }
}