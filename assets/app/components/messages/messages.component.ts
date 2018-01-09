import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { WebService } from './../../services/web.service';
import { webSocket } from 'rxjs/observable/dom/webSocket';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  constructor(private webService: WebService, private route: ActivatedRoute, private auth: AuthService) { }

  name = undefined;
  async ngOnInit() {
    this.name  = this.route.snapshot.params.name;
    if ( !this.name || this.name.length == 0) {
      this.webService.getMessages();
    } else {
      console.log(name);
      this.webService.getMessageFromUser(this.name);
    }
    // this.webService.messagesObservable.subscribe(messages => this.messages = messages);
  }

  deleteMessage(index){
    this.webService.deleteMessage(index)
  }
}
