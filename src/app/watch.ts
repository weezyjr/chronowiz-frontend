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
  public movementAutomaticOrManual?: string;
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
  public waterResistance?: string;
  public caseCrown?: string;
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

  public price: number;
  public priceCurrency: string;

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
  public section5PhotoUrls?: object[];

  public mainPhotoFile: File;
  public banner1PhotoFile?: File;
  public banner2PhotoFile?: File;

  public section1PhotoFile?: File;
  public section2PhotoFile?: File;
  public section3PhotoFile?: File;
  public section4PhotoFile?: File;
  public section5PhotoFiles?: object[];

  constructor(private isTestWatch?: boolean)
  {
    super();

    if (!isTestWatch)
    {
      this.movementAdditionalFeatures = [{value: ''}];
      this.functions = [{value: ''}];
      this.caseAdditionalFeatures = [{value: ''}];
      this.dialAdditionalFeatures = [{value: ''}];
      this.bandAdditionalFeatures = [{value: ''}];
      this.section5PhotoFiles = [{value: ''}];
    }
    else if (isTestWatch)
    {
      this.brand = 'A. Lange & Sohne';
      this.model = 'Lange 1 Daymatic';
      this.referenceNumber = '320.032';
      this.gender = 'Men';
      this.limited = '1989';
      this.awards = 'Geneva Seal';

      this.movementCaliberName = 'Lange';
      this.movementAutomaticOrManual = 'Automatic';
      this.movementCaliberNumber = 'L021.1';
      this.movementDiameter = '31.6';
      this.movementHeight = '6.1';
      this.movementJewels = '67';
      this.movementFrequency = '21,600';
      this.movementPowerReserve = '50';
      this.movementCertificate = 'COSC';
      this.movementDecoration = 'Côtes de Genève';
      this.movementSpring = 'movementSpring';
      this.movementTourbillon = 'One Minute Tourbillon';
      this.movementRotor = 'movementRotor';
      this.movementAdditionalFeatures = [{value: 'hand-engraved balance cock'}, {value: '7 screw-mounted gold chatons'}, {value: 'central rotor with platinum weight'}];

      this.functions = [{value: 'hours'}, {value: 'minutes'}, {value: 'subsidiary seconds'}, {value: 'large date'}, {value: 'weekday (retrograde)'}];

      this.caseMaterial = 'Pink Gold';
      this.caseDiameter = '39.5';
      this.caseHeight = '10.4';
      this.caseFront = 'Saphire Crystal';
      this.caseBack = 'Transparent';
      this.waterResistance = '3';
      this.caseCrown = 'Screw-in Crown';
      this.caseAdditionalFeatures = [{value: ''}];

      this.dialColour = 'White';
      this.dialIndex = 'Roman Numeral';
      this.dialFinish = 'dialFinish';
      this.dialHands = 'DAUPHINE HANDS';
      this.dialAdditionalFeatures = [{value: ''}];

      this.band = 'Leather';
      this.bandMaterial = 'Reptile Skin';
      this.bandClasp = 'Buckle';
      this.bandColour = 'Brown';
      this.bandClaspMaterial = 'Pink Gold';
      this.bandAdditionalFeatures = [{value: ''}];

      this.price = 43200;
      this.priceCurrency = 'USD';

      this.mainPhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-liv-media/watches/320.032/mainPhoto_1541580825877.jpg';

      this.banner1PhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/watches/referenceNumber/banner1.png';
      this.banner2PhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/watches/referenceNumber/banner2.png';

      this.section1Title = '18 CT GOLD';
      this.section1Paragraph = 'By operating its own exclusive foundry, Rolex has the unrivalled ability to cast the highest quality 18 ct gold alloys.' +
        'According to the proportion of silver, copper, platinum or palladium added, different types of 18 ct gold are obtained: yellow, pink or white.' +
        'They are made with only the purest metals and meticulously inspected in an in-house laboratory with state-of-the-art equipment,' +
        'before the gold is formed and shaped with the same painstaking attention to quality. Rolex\'s commitment to excellence begins at the source.';
      this.section1PhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/watches/referenceNumber/section1photo.png';

      this.section2Title = 'WHITE DIAL';
      this.section2Paragraph = 'The dial is the distinctive face of a Rolex watch, the feature most responsible for its identity and readability.' +
        'Characterised by hour markers fashioned from 18 ct gold to prevent tarnishing, every Rolex dial is designed and manufactured in-house, largely by hand to ensure perfection.';
      this.section2PhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/watches/referenceNumber/section2photo.png';

      this.section3Title = 'THE PRESIDENT BRACELET';
      this.section3Paragraph = 'The design, development and production of Rolex bracelets and clasps, as well as the stringent tests they face,' +
        'involve advanced high technology. And, as with all the components of the watch, aesthetic controls by the human eye guarantee impeccable beauty.' +
        'The President bracelet, with its semi-circular three piece links, was created in 1956 for the launch of the Oyster Perpetual Day-Date.' +
        'It represents the ultimate in refinement and comfort and is always made of carefully selected precious metals.';
      this.section3PhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/watches/referenceNumber/section3photo.png';

      this.section4Title = '3255 MOVEMENT';
      this.section4Paragraph = 'The Day-Date 40 is equipped with a new-generation movement, calibre 3255, entirely developed and manufactured' +
        'by Rolex for a superlative level of performance. This self-winding mechanical movement is at the forefront of the art of watchmaking.' +
        'A consummate demonstration of Rolex technology, with 14 patents, it offers fundamental gains in terms of precision, power reserve,' +
        'resistance to shocks and magnetism, ease of use and reliability.';
      this.section4PhotoUrl = 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/watches/referenceNumber/section4photo.png';

      this.section5Title = 'MONDAY, LUNDI';
      this.section5Paragraph = 'Initially presented in 1956, the Day-Date was a world first. The first watch to indicate the day of the week' +
        'spelt out in full. Worn by many world leaders, the Day-Date is available with a bespoke day display in a wide choice of languages.';
      this.section5PhotoFiles = [{value: ''}];
      this.section5PhotoUrls = [{value: 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/watches/referenceNumber/section5photo1.png'},
        {value: 'https://s3-eu-west-1.amazonaws.com/chronowiz-loc-media/watches/referenceNumber/section5photo2.png'}];
    }
  }
}
