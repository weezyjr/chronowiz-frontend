import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './Authentication.service';

@Injectable({providedIn: 'root'})
export class RetailerGuard implements CanActivate
{
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  )
  {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const currentRetaielerUser = this.authenticationService.currentRetailerValue;
    if (currentRetaielerUser && currentRetaielerUser.jwt)
    {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/retailer/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
