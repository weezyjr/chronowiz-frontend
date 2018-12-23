import { Directive, Input, Attribute } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[appConfirmPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true }]
})
export class ConfirmPasswordDirective implements Validator {
  @Input('appConfirmPassword') passwordControler: string;

  constructor(@Attribute('name') public controlerName: string) { }

  private get isPasswordControler(): Boolean {
    if (!this.controlerName) {
      return false;
    }
    return this.controlerName === 'password' ? true : false;
  }

  validate(control: AbstractControl): { [key: string]: any } | null {

    const password = control.root.get(this.passwordControler);
    const confirmPassword = control;
    const passwordMatch = password && confirmPassword && password.value === confirmPassword.value;

    if (!passwordMatch && !this.isPasswordControler) {
      return {
        confirmPassword: false
      };
    }
    else if (password && !passwordMatch && this.isPasswordControler) {
      password.setErrors({ confirmPassword: false });
    }
    else if (password && passwordMatch && this.isPasswordControler) {
      delete password.errors['confirmPassword'];
      if (Object.keys(password.errors).length === 0) {
        password.setErrors(null);
      }
    }
    return null;
  }
}
