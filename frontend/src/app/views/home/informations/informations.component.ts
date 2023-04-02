import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public leftIsShow:boolean = false;
  public rightIsShow:boolean = false;
  public leftHeight = "0px";
  public rightHeight = "0px";


  toggleLeftDisplay() {
    this.leftIsShow = !this.leftIsShow;

    if(this.leftIsShow) {
      this.leftHeight = "800px";
    }
    else {
      this.leftHeight = "0px";
    }

    if(this.rightIsShow && this.leftIsShow) {
      this.toggleRightDisplay();
    }
  }

  toggleRightDisplay() {
    this.rightIsShow = !this.rightIsShow;

    if(this.rightIsShow) {
      
      this.rightHeight = "800px";
    }
    else {
      this.rightHeight = "0px";
    }

    if(this.leftIsShow  && this.rightIsShow) {
      this.toggleLeftDisplay();
    }
  }
}

