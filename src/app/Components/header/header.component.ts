import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/Auth/Authentication.service';
import { Router } from '@angular/router';
import { WatchTrayService } from 'src/app/User/Services/WatchTray/watch-tray.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  private _bg_rgb_: number[] = [];

  @Input()
  breads: Array<Object>;

  @Input()
  background_color: String | string = '#ffffff';

  @Input()
  content_color: 'dark' | 'light' = 'dark';

  @Input()
  opacity = 100;

  @Input()
  _brandLogo: String;

  @Input()
  _brandName: String;

  @Input()
  noHeightFix: Boolean = false;

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
  chronoWizLogoSrc: String;

  constructor(
    private watchTrayService: WatchTrayService,
    private authenticationService: AuthenticationService,
    private router: Router) {

  }

  get numberOfWatchesInTheWatchTray(): number {
    if (this.watchTrayService.currentWatchTrayValue) {
      return this.watchTrayService.currentWatchTrayValue.length;
    }
  }

  get backgroundColor(): string {
    if (this.opacity && this.opacity !== 0) {
      return `rgba(${this._bg_rgb_[0]},${this._bg_rgb_[1]},${this._bg_rgb_[2]}, ${this.opacity / 100} )`;
    } else {
      return `none`;
    }
  }


  ngOnInit() {
    // convert background color from hex to rgb
    this._bg_rgb_ = this.HEX2RGB(this.background_color);

    if (this.content_color === 'dark') {
      if (!this._brandLogo) {
        this._brandLogo = '../../../assets/logo.svg';
      }
      this.userIconSrc = '../../../assets/user.svg';
      this.searchIconSrc = '../../../assets/search.svg';
      this.menuIconSrc = '../../../assets/menu.svg';
      this.menuCloseSrc = '../../../assets/menucloseblack.svg';
      this.paperBagIconSrc = '../../../assets/paper-bag.svg';
      this.chronoWizLogoSrc = '../../../assets/logo.svg';
    } else {
      if (!this._brandLogo) {
        this._brandLogo = '../../../assets/logo-white.svg';
      }
      this.userIconSrc = '../../../assets/user-white.svg';
      this.searchIconSrc = '../../../assets/search-white.svg';
      this.menuIconSrc = '../../../assets/menu-white.svg';
      this.menuCloseSrc = '../../../assets/menuclose.svg';
      this.paperBagIconSrc = '../../../assets/paper-bag-white.svg';
      this.chronoWizLogoSrc = '../../../assets/logo-white.svg';
    }

  }

  HEX2RGB(hex: String): number[] {
    if (hex && hex.length && typeof hex === 'string') {
      if (hex.charAt(0) === '#') {
        hex = hex.substr(1);
      }
      if ((hex.length < 2) || (hex.length > 6)) {
        return [];
      }
      const values = hex.split('');
      let r: number,
        g: number,
        b: number;

      if (hex.length === 2) {
        r = parseInt(values[0].toString() + values[1].toString(), 16);
        g = r;
        b = r;
      } else if (hex.length === 3) {
        r = parseInt(values[0].toString() + values[0].toString(), 16);
        g = parseInt(values[1].toString() + values[1].toString(), 16);
        b = parseInt(values[2].toString() + values[2].toString(), 16);
      } else if (hex.length === 6) {
        r = parseInt(values[0].toString() + values[1].toString(), 16);
        g = parseInt(values[2].toString() + values[3].toString(), 16);
        b = parseInt(values[4].toString() + values[5].toString(), 16);
      } else {
        return [];
      }
      return [r, g, b];
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
    else {
      document.getElementById('mySidenav').style.width = '0px';
      this.navMenuOpened = false;
    }
  }
}
