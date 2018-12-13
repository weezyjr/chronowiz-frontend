import { Component, OnInit, Input } from '@angular/core';

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

  get brandName(): Array<String> {
    if (!this._brandName) {
      return ['/home'];
    } else {
      return ['/brand' , this._brandName];
    }
  }

  menuClosed: Boolean = true;
  userIconSrc: String;
  searchIconSrc: String;
  menuIconSrc: String;
  paperBagIconSrc: String;

  constructor() {

  }

  ngOnInit() {
    if (this.transparent === true) {
      if (!this._brandLogo) {
        this._brandLogo = '../../../assets/logo.svg';
      }
      this.userIconSrc = '../../../assets/user.svg';
      this.searchIconSrc = '../../../assets/search.svg';
      this.menuIconSrc = '../../../assets/menu.svg';
      this.paperBagIconSrc = '../../../assets/paper-bag.svg';
    } else {
      if (!this._brandLogo) {
        this._brandLogo = '../../../assets/logo-white.svg';
      }
      this.userIconSrc = '../../../assets/user-white.svg';
      this.searchIconSrc = '../../../assets/search-white.svg';
      this.menuIconSrc = '../../../assets/menu-white.svg';
      this.paperBagIconSrc = '../../../assets/paper-bag-white.svg';
    }
    console.log(this.transparent);
  }

  openUserMenu() {
    if (this.menuClosed) {
      this.menuClosed = false;
    } else {
      this.menuClosed = true;
    }
  }

}
