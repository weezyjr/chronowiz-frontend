import {ResponseData} from './response-data';

export class Watch extends ResponseData
{
  public brand: string;
  public model: string;
  public referenceNumber: string;
  public gender?: string;
  public limited?: string;
  public awards?: string;

  public movementCaliberName: string;
  public movementCaliberNumber: string;
  public movementDiameter: string;
  public movementHeight: string;
  public movementJewels: string;
  public movementFrequency: string;
  public movementPowerReserve: string;
  public movementCertificate?: string;
  public movementDecoration?: string;
  public movementSpring?: string;
  public movementTourbillon?: string;
  public movementRotor?: string;
  public movementAdditionalFeatures?: object[];

  public functions: object[];

  public caseMaterial: string;
  public caseDiameter: string;
  public caseHeight: string;
  public caseFront: string;
  public caseBack: string;
  public waterResistance: string;
  public caseCrown: string;
  public caseAdditionalFeatures?: object[];

  public dialColour: string;
  public dialIndex: string;
  public dialFinish?: string;
  public dialHands: string;
  public dialAdditionalFeatures?: object[];

  public band: string;
  public bandMaterial: string;
  public bandClasp: string;
  public bandColour: string;
  public bandClaspMaterial: string;
  public bandAdditionalFeatures?: object[];

  public price: string;

  public mainPhotoUrl: string;

  public banner1PhotoUrl?: string;
  public banner2PhotoUrl?: string;

  public section1Title?: string;
  public section1Paragraph?: string;
  public section1PhotoUrl?: string;

  public section2Title?: string;
  public section2Paragraph?: string;
  public section2PhotoUrl?: string;

  public section3Title?: string;
  public section3Paragraph?: string;
  public section3PhotoUrl?: string;

  public section4Title?: string;
  public section4Paragraph?: string;
  public section4PhotoUrl?: string;

  public section5Title?: string;
  public section5Paragraph?: string;
  public section5PhotoUrls?: string;

  public mainPhotoFile: File;
  public banner1PhotoFile?: File;
  public banner2PhotoFile?: File;

  public section1PhotoFile?: File;
  public section2PhotoFile?: File;
  public section3PhotoFile?: File;
  public section4PhotoFile?: File;
  public section5PhotoFiles?: File;

  constructor()
  {
    super();

    this.movementAdditionalFeatures = [];
    this.functions = [];
    this.caseAdditionalFeatures = [];
    this.dialAdditionalFeatures = [];
    this.bandAdditionalFeatures = [];
  }
}
