import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './Authentication.service';

@Injectable({ providedIn: 'root' })
export class ResetPasswordGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  canActivate() {
    const resetPassword = this.authenticationService.resetPassword;
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser &&
      resetPassword &&
      resetPassword.email &&
      resetPassword.recoveryEmailVerificationCode) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to reset password
    this.router.navigate(['/login']);
    return false;
  }
}
