import { Subject } from 'rxjs/rx';
import { error } from 'util';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:8000/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';
  private userStore = [];
  private userSubject = new Subject();
  userId = null;
  userObservable = this.userSubject.asObservable();

  constructor(private http: Http,  private router: Router) { }

  get name(){
    return localStorage.getItem(this.NAME_KEY);
  }

  get TokenHeader() {
    var header = new Headers({'x-auth': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
    return new RequestOptions({headers: header});
  }

  get isAuthenticated(){
    if ( localStorage.getItem(this.TOKEN_KEY) ) {
      return true;
    } else {
      return false;
    }
  }

  pushUser(user){
    if(user == null){
      this.userStore = null;
      this.userId = null;
    } 
    else{
      this.userStore = [user];
      this.userId = user.userId;
    } 
    this.userSubject.next(this.userStore);
  }

  register(user) {
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
      var authResponse = res.json();

      if(!authResponse)
        return;

      this.authenticate(authResponse);
    });
  }

  private authenticate(authResponse) {
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.NAME_KEY, authResponse.username);
    this.pushUser(authResponse);
    this.router.navigate(['/']);
  }

  checkEmailTaken(email){
    return this.http.post(this.BASE_URL + '/checkEmail', {email})
  }

  login(user) {

    return this.http.post(this.BASE_URL + '/login', user).switchMap(res => {
      //console.log('reached here');
      var authResponse = res.json();

      if(!authResponse)
        return Observable.of(false);

      this.authenticate(authResponse);
      return Observable.of(true);
    }).catch((e) => {
      this.pushUser(null);
      return Observable.of(false);
    });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.NAME_KEY);
    this.pushUser(null);
    this.router.navigate(['/login']);
  }
}
