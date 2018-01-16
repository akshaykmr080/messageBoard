import { AuthService } from './../assets/app/services/auth.service';
import { AbstractControl } from '@angular/forms';
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators.emailTakenValidator = function (auth) {
        return function (control) {
            console.log(control.value);
            //auth.checkEmailTaken(control.value).toPromise();
            return auth.checkEmailTaken(control.value).map(function (res) {
                console.log(res);
                var taken = res.json().emailTaken;
                console.log(taken);
                return taken ? { emailTaken: true } : null;
            });
        };
    };
    CustomValidators.emailValid = function (control) {
        return function (control) {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            //console.log(regex.test(control.value))
            return regex.test(control.value) ? null : { invalidEmail: true };
        };
    };
    CustomValidators.matchingFields = function (control) {
        var newPassword = control.get('password');
        var confirmPassword = control.get('confirmPassword');
        if (newPassword.value !== confirmPassword.value)
            return { mismatchedFields: true };
        return null;
    };
    return CustomValidators;
}());
export { CustomValidators };
