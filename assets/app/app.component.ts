import { MessagesComponent } from './components/messages/messages.component';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild(MessagesComponent) messages: MessagesComponent;

  // onPosted($event) {
  //   // this.messages.messages.push($event);
  // }
}
