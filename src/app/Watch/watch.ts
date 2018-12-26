import { Brand } from '../Brand/brand';
import { Collection } from '../Collection/collection';

class Value {
  public value: string;
  constructor() {
    this.value = '';
  }
}

export class Watch {
  public _id?: string;
  public updatedAt?: string;

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
  public movementAdditionalFeatures?: Value[];
  public numberOfParts?: Number;

  public functions?: Value[];
  public complications?: Value[];

  public caseMaterial?: string;
  public caseDiameter?: string;
  public caseHeight?: string;
  public caseFront?: string;
  public caseBack?: string;
  public caseBezelMaterial?: string;
  public waterResistance?: string;
  public waterProof?: string;
  public caseCrown?: string;
  public caseAdditionalFeatures?: Value[];

  public dialColour?: string;
  public dialIndex?: string;
  public dialFinish?: string;
  public dialType?: string;
  public dialHands?: string;
  public dialAdditionalFeatures?: Value[];

  public band?: string;
  public bandMaterial?: string;
  public bandClasp?: string;
  public bandColour?: string;
  public bandClaspMaterial?: string;
  public bandAdditionalFeatures?: Value[];

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

  public maximumDiscount?: number;

  constructor() {
    this.brandObject = new Brand();
    this.collectionObject = new Collection();
    this.movementAdditionalFeatures = [new Value];
    this.functions = [new Value];
    this.complications = [new Value];
    this.caseAdditionalFeatures = [new Value];
    this.dialAdditionalFeatures = [new Value];
    this.bandAdditionalFeatures = [new Value];
    this.mainPhotoUrl = '';
    this.banner1PhotoUrl = '';
    this.banner2PhotoUrl = '';
    this.section1PhotoUrl = '';
    this.section2PhotoUrl = '';
    this.section3PhotoUrl = '';
    this.section4PhotoUrl = '';

  }
}
