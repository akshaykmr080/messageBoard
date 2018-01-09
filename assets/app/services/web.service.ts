import { AuthService } from './auth.service';
import { MatSnackBarModule } from '@angular/material';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/rx';
import {MatSnackBar } from '@angular/material';

@Injectable()
export class WebService {
  BASE_URL  = 'http://localhost:3000/api';

  private messagesStore = [];

  private messageSubject = new Subject();

  messagesObservable = this.messageSubject.asObservable();
  constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService) { }

  async getMessages() {
    try {
      //console.log('getting messages')
      var response =  await this.http.get(this.BASE_URL + '/messages', this.auth.TokenHeader).toPromise();
      //console.log(response.json())
      var messages = response.json().messages;
      //console.log(messages);
      this.messagesStore = messages;
      this.messageSubject.next(this.messagesStore);
      //this.getUser();
      return response;
    } catch (error) {
      console.log(error);
      this.errorHandler('Unable to get messages');
      //this.sb.open('unable to get messages', 'close', {duration: 2000});
      //alert('Unable to fetch messages');
    }
  }

  getMessageFromUser (name) {
    if(!name) return;

    this.http.get(this.BASE_URL + '/messages/' + name, this.auth.TokenHeader).subscribe(response => {
        console.log(response.json().messageData);
        this.messagesStore = response.json().messageData;
        this.messageSubject.next(this.messagesStore);
    }, (err) => {
        this.messagesStore = [];
        this.messageSubject.next(this.messagesStore);
         this.errorHandler('Unable to get messages');
    });
  }


  async postMessage(message) {
    try {
      var response = await this.http.post(this.BASE_URL + '/messages', message, this.auth.TokenHeader).toPromise();
      console.log(response.json())
      this.messagesStore.push(response.json());
      this.messageSubject.next(this.messagesStore);
      // return response.json();
    } catch (error) {
      this.errorHandler('unable to post message');
    }
  }

  async deleteMessage(index){
    var res = await this.http.delete(this.BASE_URL+ '/messages/'+ index , this.auth.TokenHeader).toPromise();
    this.messagesStore.splice(index, 1);
    this.messageSubject.next(this.messagesStore);
    
  }


  getUser() {
    return this.http.get(this.BASE_URL + '/users/me', this.auth.TokenHeader).map(res => { return res.json()});
  }

  postUser(userData) {
    return this.http.post(this.BASE_URL + '/users/me', userData, this.auth.TokenHeader).map(res =>  res.json());
  }

  private errorHandler(message) {
    this.sb.open(message, 'close', {duration: 2000});
  }
}
