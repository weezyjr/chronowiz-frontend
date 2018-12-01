import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit
{

  SEARCH_ICON_PATH = '../../../assets/search.svg';
  LOGO_PATH = '../../../assets/home/logos/';
  SOCIAL_MEDIA_PATH = '../../../assets/home/socialmedia/';

  /*Dummy*/
  brands = [
    {
      name: 'Audemars piguet',
      logo: this.LOGO_PATH + 'Audemars-piguet-logo.png'
    },
    {
      name: 'Rolex',
      logo: this.LOGO_PATH + 'rolex.png'
    },
    {
      name: 'Audemars piguet',
      logo: this.LOGO_PATH + 'Audemars-piguet-logo.png'
    },
    {
      name: 'Audemars piguet',
      logo: this.LOGO_PATH + 'Audemars-piguet-logo.png'
    },
    {
      name: 'Audemars piguet',
      logo: this.LOGO_PATH + 'Audemars-piguet-logo.png'
    },
    {
      name: 'Audemars piguet',
      logo: this.LOGO_PATH + 'Audemars-piguet-logo.png'
    },
    {
      name: 'Audemars piguet',
      logo: this.LOGO_PATH + 'Audemars-piguet-logo.png'
    },
    {
      name: 'Audemars piguet',
      logo: this.LOGO_PATH + 'Audemars-piguet-logo.png'
    },
    {
      name: 'Audemars piguet',
      logo: this.LOGO_PATH + 'Audemars-piguet-logo.png'
    }
  ];

  socialMedia = [
    {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    },
    {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    }, {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    },
    {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    },
    {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    },
    {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    }, {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    }, {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    }, {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    },
    {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    }, {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    }, {
      url: '#',
      img: this.SOCIAL_MEDIA_PATH + '1.png'
    }

  ];
  /*Dummy*/


  // show More Arrays
  showMoreBrandsList = [];
  showMoreSocialMediaList = [];

  // Search query and backup the brands array for the search
  public query: String;
  brandBackup = this.brands.slice();

  constructor()
  {
    // cut the brands and social media into 2 arrays one hidden and one rendered
    if (this.brands.length >= 8)
    {
      this.showMoreBrandsList = this.brands.splice(8);
    }

    if (this.socialMedia.length >= 8)
    {
      this.showMoreSocialMediaList = this.socialMedia.splice(8);
    }
  }

  // search by query
  filterResults()
  {
    // return the array to the backup one
    this.brands = this.brandBackup;
    // empty the show more
    this.showMoreBrandsList = [];
    // filter the brands array by query
    if (this.query && this.query.trim() !== '')
    {
      this.brands = this.brands.filter((brand) =>
      {
        if (brand['name'])
        {
          return (brand['name'].toLowerCase().indexOf(this.query.toLowerCase()) > -1);
        }
      });
    }
  }

  // render the show more brands list
  showMoreBrands()
  {
    for (const brand of this.showMoreBrandsList)
    {
      this.brands.push(brand);
    }
    this.showMoreBrandsList = [];
  }

  // check if the show more brands list is empty
  get isShowMoreBrandsEmpty()
  {
    return this.showMoreBrandsList.length === 0;
  }

  // render the show more Social Media list
  showMoreSocialMedia()
  {
    for (const socialMedia of this.showMoreSocialMediaList)
    {
      this.socialMedia.push(socialMedia);
    }
    this.showMoreSocialMediaList = [];
  }

  // check if the show more Social Media list is empty
  get isShowMoreSocialMediaEmpty()
  {
    return this.showMoreSocialMediaList.length === 0;
  }

  ngOnInit()
  {
  }

}
