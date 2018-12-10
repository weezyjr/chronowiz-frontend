import { Component, OnInit, Input } from '@angular/core';
import { Watch } from 'src/app/Watch/watch';

@Component({
  selector: 'app-attribute-table',
  templateUrl: './attribute-table.component.html',
  styleUrls: ['./attribute-table.component.sass']
})
export class AttributeTableComponent implements OnInit {

  @Input()
  watch: Watch = new Watch();

  price: any = 'Show Price';

  get watchAttributesColumns(): Array<Object> {
    return [{
      name: 'GENERAL',
      attributes: [{
        'MODEL CASE': `${this.watch.model}, ${this.watch.caseDiameter} mm, ${this.watch.caseMaterial}, ${this.watch.perpetual}`
      },
      {
        'REFERENCE': `${this.watch.referenceNumber}`
      },
      {
        'MOVEMENT': `${this.watch.movementAutomaticOrManual}`
      },
      {
        'CASE MATERIAL': `${this.watch.caseMaterial}`
      },
      {
        'BAND MATERIAL': `${this.watch.bandMaterial}`
      },
      {
        'PRODUCTION YEAR': `${this.watch.productionYear}`
      },
      {
        'GENDER': `${this.watch.gender}`
      }
      ]
    }, {
      name: 'CALIBRE',
      attributes: [{
        'MOVEMENT': `${this.watch.movementCaliberName}`
      },
      {
        'CALIBRE': `${this.watch.movementCaliberNumber}`
      },
      {
        'FUNCTIONS': `${this.watch.functions.map(fun => fun.value).join(', ')}`
      },
      {
        'POWER RESERVE': `${this.watch.movementPowerReserve} h`
      },
      {
        'JEWELS': `${this.watch.movementJewels}`
      },
      {
        'FREQUENCY': `${this.watch.movementFrequency} vph`
      }
      ]
    }, {
      name: 'CASE',
      attributes: [
        {
          'MATERIAL': `${this.watch.caseMaterial}`
        },
        {
          'DIAMETER': `${this.watch.caseDiameter} mm`
        },
        {
          'WATER-PROOF': `${this.watch.waterResistance} atm`
        },
        {
          'BEZEL MATERIAL': `${this.watch.caseBezelMaterial}`
        },
        {
          'CRYSTAL': `${this.watch.caseFront}`
        }
      ]
    }, {
      name: 'CERTIFICATION',
      attributes: [{
        '': `${this.watch.movementCertificate},${this.watch.awards}`
      }]
    }, {
      name: 'BAND',
      attributes: [{
        'BRACELET': `${this.watch.band}`
      },
      {
        'BAND MATERIAL': `${this.watch.bandMaterial}`
      },
      {
        'CLASP TYPE': `${this.watch.bandClasp}`
      },
      {
        'CLASP COLOR': `${this.watch.bandColour}`
      }
      ]
    }, {
      name: 'DIAL',
      attributes: [{
        'DIAL COLOR': `${this.watch.dialColour}`
      },
      {
        'DIAL FINISH': `${this.watch.dialFinish}`
      },
      {
        'DIAL INDEXES': `${this.watch.dialIndex}`
      },
      {
        'DIAL HANDS': `${this.watch.dialHands}`
      },
      ]
    }];
  }

  showPrice() {
    if (this.watch.price) {
      if (this.watch.priceCurrency === 'Other') {
        this.price = this.watch.price.toLocaleString('en');
      }
      else {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: this.watch.priceCurrency,
          minimumFractionDigits: 0
        });
        this.price = formatter.format(this.watch.price) + ' ' + this.watch.priceCurrency;
      }
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}
