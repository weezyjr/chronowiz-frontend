import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './Authentication.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate
{
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  )
  {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const currentAdmin = this.authenticationService.currentAdminValue;
    if (currentAdmin && currentAdmin.jwt)
    {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/admin/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
