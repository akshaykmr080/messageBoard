import { WebService } from '../../services/web.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  authUser = false;
  constructor(private auth: AuthService, private webService: WebService) { 
    // webService.getUser().subscribe(user => {
    //   if(user){
    //     console.log("HAHAHHAHA")
    //     this.authUser = true;
    // }
    //   else 
    //     this.authUser = false;
    // })
    this.auth.userObservable.subscribe(user => {
      if(user) this.authUser = true;
      else this.authUser = false;
    })
    
  }

  ngOnInit() {
  }

}
