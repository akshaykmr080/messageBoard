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
  BASE_URL  = 'http://localhost:3000/messages';
  BASE_USER_URL = 'http://localhost:3000/users';
  private messagesStore = [];

  private messageSubject = new Subject();

  messagesObservable = this.messageSubject.asObservable();
  constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService) { }

  async getMessages() {
    try {
      
      var response =  await this.http.get(this.BASE_URL + '/get' , this.auth.TokenHeader).toPromise();
      
      var messages = response.json().obj;
      
      
      this.messagesStore = messages;
      this.messageSubject.next(this.messagesStore);
      
      return response;
    } catch (error) {
      
      this.errorHandler('Unable to get messages');
    }
  }

  getMessageFromUser (userId) {
    if(!userId) return;

    this.http.get(this.BASE_URL + '/' + userId, this.auth.TokenHeader).subscribe(response => {
        
        this.messagesStore = response.json().obj;
        this.messageSubject.next(this.messagesStore);
    }, (err) => {
        this.messagesStore = [];
        this.messageSubject.next(this.messagesStore);
         this.errorHandler('Unable to get messages');
    });
  }


   postMessage(message) {
    try {
      var messageData = JSON.stringify(message);
      
      var response = this.http.post(this.BASE_URL + '/add' , message, this.auth.TokenHeader).subscribe(response => {
        this.messagesStore.push(response.json().obj);
        this.messageSubject.next(this.messagesStore);
        return response.json();
      })
    } catch (error) {
      this.errorHandler('unable to post message');
    }
  }

  async deleteMessage(id){

    try{
      var res = await this.http.delete(this.BASE_URL+ '/'+ id , this.auth.TokenHeader).toPromise();
      var message = this.messagesStore.find(message => message._id == id);
      if(!message) return;
      this.messagesStore.splice(this.messagesStore.indexOf(message), 1);
      this.messageSubject.next(this.messagesStore);
    } catch(error){
      this.errorHandler('unable to delete message');
    }
    
    
  }


  getUser() {
    return this.http.get(this.BASE_USER_URL + '/me', this.auth.TokenHeader).map(res => res.json().obj);
  }

  postUser(userData) {
    return this.http.post(this.BASE_USER_URL + '/me', userData, this.auth.TokenHeader).map(res =>  res.json().obj);
  }

  async getUserName(id){
    try {
      var res = await this.http.get(this.BASE_USER_URL + '/name' + '/' + id, this.auth.TokenHeader).toPromise();
      return res.json().obj;
    } catch(error) {
      this.errorHandler('failed to retrieve username');
    }
     

  }
  private errorHandler(message) {
    this.sb.open(message, 'close', {duration: 2000});
  }
}
