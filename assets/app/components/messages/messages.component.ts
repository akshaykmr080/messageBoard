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
  
  constructor(public webService: WebService, private route: ActivatedRoute, public auth: AuthService) { }

  userid = undefined;
  name = undefined;
  ngOnInit() {
    this.userid  = this.route.snapshot.params.id;
    if ( !this.userid || this.userid.length == 0) {
      this.webService.getMessages();
    } else {
      
      this.webService.getUserName(this.userid)
      .then(userName => this.name = userName)
      .catch((err) => console.log(err));

      this.webService.getMessageFromUser(this.userid);
    }
  }

  deleteMessage(id){
    this.webService.deleteMessage(id)
  }
}
