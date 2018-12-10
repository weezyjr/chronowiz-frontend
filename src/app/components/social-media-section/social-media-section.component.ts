import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-media-section',
  templateUrl: './social-media-section.component.html',
  styleUrls: ['./social-media-section.component.sass']
})
export class SocialMediaSectionComponent implements OnInit {

  SOCIAL_MEDIA_PATH = '../../../assets/images/';
  socialMedia = [
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-4-copy@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-5@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-6@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-7@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-8@2x.png',
    },
    {
      img: this.SOCIAL_MEDIA_PATH + 'group-9@2x.png',
    }, {
      img: this.SOCIAL_MEDIA_PATH + 'group-10@2x.png',
    }, {
      img: this.SOCIAL_MEDIA_PATH + 'group-11@2x.png',
    }
  ];

  socialLimit = 8;

  constructor() { }

  // render the show more Social Media list
  showMoreSocialMedia() {
    this.socialLimit = Infinity;
  }

  // check if the show more Social Media list is empty
  get isShowMoreSocialMediaEmpty() {
    return this.socialLimit === Infinity;
  }

  ngOnInit() {
  }

}
