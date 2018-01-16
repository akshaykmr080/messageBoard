import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form;
  invalidLogin = false;
  user = {
    firstname: '',
    lastname: ''
  };

  constructor(private fb: FormBuilder, private webService: WebService, private router: Router) {
    this.form = fb.group({
      firstname: ['', Validators.required],
      lastname: ['']
    });
   }

  ngOnInit() {
    this.webService.getUser().subscribe(userdata => {
      
      this.user.firstname = userdata.firstname;
      this.user.lastname = userdata.lastname;
    });
  }

  onSubmit() {
    
    this.webService.postUser(this.form.value).subscribe(user => {
      if(user)
        this.router.navigate(['/']);
      else 
        this.invalidLogin = true;
    });
  }

  isValid(control) {
    return this.form.controls[control].invalid &&  this.form.controls[control].touched;
  }
}
