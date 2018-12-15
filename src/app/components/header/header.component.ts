import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/Auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Input()
  transparent: Boolean = true;

  @Input()
  bg_white: Boolean = false;

  @Input()
  _brandLogo: String;

  @Input()
  _brandName: String;

  get logged(): Boolean {
    if (this.authenticationService.currentUserValue) {
      return true;
    }
    else {
      return false;
    }
  }

  get brandName(): Array<String> {
    if (!this._brandName) {
      return ['/home'];
    } else {
      return ['/brand', this._brandName];
    }
  }

  menuClosed: Boolean = true;
  userIconSrc: String;
  searchIconSrc: String;
  menuIconSrc: String;
  menuCloseSrc: String;
  paperBagIconSrc: String;
  navMenuOpened: Boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }

  ngOnInit() {
    if (this.transparent === true) {
      if (!this._brandLogo) {
        this._brandLogo = '../../../assets/logo.svg';
      }
      this.userIconSrc = '../../../assets/user.svg';
      this.searchIconSrc = '../../../assets/search.svg';
      this.menuIconSrc = '../../../assets/menu.svg';
      this.menuCloseSrc = '../../../assets/menucloseblack.svg';
      this.paperBagIconSrc = '../../../assets/paper-bag.svg';
    } else {
      if (!this._brandLogo) {
        this._brandLogo = '../../../assets/logo-white.svg';
      }
      this.userIconSrc = '../../../assets/user-white.svg';
      this.searchIconSrc = '../../../assets/search-white.svg';
      this.menuIconSrc = '../../../assets/menu-white.svg';
      this.menuCloseSrc = '../../../assets/menuclose.svg';
      this.paperBagIconSrc = '../../../assets/paper-bag-white.svg';
    }

  }

  logout() {
    this.authenticationService.logout('user');
  }

  openUserMenu() {
    if (this.logged) {
      if (this.menuClosed) {
        this.menuClosed = false;
      } else {
        this.menuClosed = true;
      }
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }

  toggleNav() {
    if (!this.navMenuOpened) {
      document.getElementById('mySidenav').style.width = '100%';
      this.navMenuOpened = true;
    }
    else{
      document.getElementById('mySidenav').style.width = '0px';
      this.navMenuOpened = false;
    }
  }
}
