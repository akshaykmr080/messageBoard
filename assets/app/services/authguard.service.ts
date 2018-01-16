import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { WebService } from './web.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class Authguard implements CanActivate {

  constructor(private webService: WebService, private router: Router, private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {

    return this.webService.getUser().map(user => {
      
      if (user) {
        
        this.auth.pushUser(user);
        return true;
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
      return false;
    }).catch((err) => {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
        return Observable.of(false);
    });
  }
}
