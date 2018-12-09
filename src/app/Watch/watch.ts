import {ItemValue} from '../item-value';
import { Brand } from '../Brand/brand';

export class Watch
{
  public _id?: string;

  public brandObject?: any;
  public collectionObject?: any;
  public model?: string;
  public referenceNumber: string;
  public gender?: string;
  public productionYear?: string;
  public limited?: string;
  public awards?: string;
  public perpetual?: string;

  public movementCaliberName?: string;
  public movementAutomaticOrManual?: string;
  public movementCaliberNumber?: string;
  public movementDiameter?: string;
  public movementHeight?: string;
  public movementJewels?: string;
  public movementFrequency?: string;
  public movementPowerReserve?: string;
  public movementCertificate?: string;
  public movementDecoration?: string;
  public movementSpring?: string;
  public movementTourbillon?: string;
  public movementRotor?: string;
  public movementAdditionalFeatures?: ItemValue[];

  public functions?: ItemValue[];

  public caseMaterial?: string;
  public caseDiameter?: string;
  public caseHeight?: string;
  public caseFront?: string;
  public caseBack?: string;
  public caseBezelMaterial?: string;
  public waterResistance?: string;
  public caseCrown?: string;
  public caseAdditionalFeatures?: ItemValue[];

  public dialColour?: string;
  public dialIndex?: string;
  public dialFinish?: string;
  public dialHands?: string;
  public dialAdditionalFeatures?: ItemValue[];

  public band?: string;
  public bandMaterial?: string;
  public bandClasp?: string;
  public bandColour?: string;
  public bandClaspMaterial?: string;
  public bandAdditionalFeatures?: ItemValue[];

  public price?: number;
  public priceCurrency?: string;

  public mainPhotoUrl?: string;
  public mainPhotoFile?: File;

  public banner1PhotoUrl?: string;
  public banner1PhotoFile?: File;

  public banner2PhotoUrl?: string;
  public banner2PhotoFile?: File;

  public section1Title?: string;
  public section1Paragraph?: string;
  public section1PhotoUrl?: string;
  public section1PhotoFile?: File;

  public section2Title?: string;
  public section2Paragraph?: string;
  public section2PhotoUrl?: string;
  public section2PhotoFile?: File;

  public section3Title?: string;
  public section3Paragraph?: string;
  public section3PhotoUrl?: string;
  public section3PhotoFile?: File;

  public section4Title?: string;
  public section4Paragraph?: string;
  public section4PhotoUrl?: string;
  public section4PhotoFile?: File;

  public section5Title?: string;
  public section5Paragraph?: string;
  public section5PhotoUrls?: ItemValue[];
  public section5PhotoFiles?: ItemValue[];

  constructor()
  {
    this.brandObject = new Brand();
    this.collectionObject = '';
    this.movementAdditionalFeatures = [{value: ''}];
    this.functions = [{value: ''}];
    this.caseAdditionalFeatures = [{value: ''}];
    this.dialAdditionalFeatures = [{value: ''}];
    this.bandAdditionalFeatures = [{value: ''}];
    this.section5PhotoFiles = [{value: ''}];
  }
}
