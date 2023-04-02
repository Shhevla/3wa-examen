import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  displayMessage(message: string, type: string) {
    var myDialog = document.createElement("div");
    if (type === 'reject') {
      myDialog.style.backgroundColor = '#E34258';
    }
    if (type === 'refused') {
      myDialog.style.backgroundColor = 'red';
    }
    if (type === 'information') {
      myDialog.style.backgroundColor = '#2e6a90';
    }

    document.body.appendChild(myDialog)
    var text = document.createTextNode(message);
    myDialog.appendChild(text);
    myDialog.classList.add("message");
    setTimeout(() => {
      myDialog!.remove();
    }, 3000);
  }
}
