import { AuthService } from './../assets/app/services/auth.service';
import { AbstractControl } from '@angular/forms';


export class CustomValidators {
  static emailTakenValidator(auth: AuthService) {
    return (control: AbstractControl) => {
        
      return auth.checkEmailTaken(control.value).then(res => {
          console.log(res)
        return res ? { emailTaken: true } : null;
      });
    };
  }

static emailValid(control: AbstractControl){
    return control => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //console.log(regex.test(control.value))
        return regex.test(control.value) ? null : { invalidEmail : true}
    }
}

static matchingFields(control: AbstractControl) {
    let newPassword = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    if (newPassword.value !== confirmPassword.value)
        return { mismatchedFields: true };
        
        return null;
    }
}