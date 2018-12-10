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
        'MODEL CASE': `${this.watch.model ? this.watch.model + ',' : ''} ${this.watch.caseDiameter ? this.watch.caseDiameter + ' mm,' : ''}` +
          `${this.watch.caseMaterial ? this.watch.caseMaterial : ','} ${this.watch.perpetual ? this.watch.perpetual : ''}`
      },
      {
        'REFERENCE': `${this.watch.referenceNumber ? this.watch.referenceNumber : ''}`
      },
      {
        'MOVEMENT': `${this.watch.movementAutomaticOrManual ? this.watch.movementAutomaticOrManual : ''}`
      },
      {
        'CASE MATERIAL': `${this.watch.caseMaterial ? this.watch.caseMaterial : ''}`
      },
      {
        'BAND MATERIAL': `${this.watch.bandMaterial ? this.watch.bandMaterial : ''}`
      },
      {
        'PRODUCTION YEAR': `${this.watch.productionYear ? this.watch.productionYear : ''}`
      },
      {
        'GENDER': `${this.watch.gender ? this.watch.gender : ''}`
      }
      ]
    }, {
      name: 'CALIBRE',
      attributes: [{
        'MOVEMENT': `${this.watch.movementCaliberName ? this.watch.movementCaliberName : ''}`
      },
      {
        'CALIBRE': `${this.watch.movementCaliberNumber ? this.watch.movementCaliberNumber : ''}`
      },
      {
        'FUNCTIONS': `${this.watch.functions.map(fun => fun.value).join(', ')}`
      },
      {
        'POWER RESERVE': `${this.watch.movementPowerReserve ? this.watch.movementPowerReserve + ' h' : ''}`
      },
      {
        'JEWELS': `${this.watch.movementJewels ? this.watch.movementJewels : ''}`
      },
      {
        'FREQUENCY': `${this.watch.movementFrequency ? this.watch.movementFrequency : ''} vph`
      }
      ]
    }, {
      name: 'CASE',
      attributes: [
        {
          'MATERIAL': `${this.watch.caseMaterial ? this.watch.caseMaterial : ''}`
        },
        {
          'DIAMETER': `${this.watch.caseDiameter ? this.watch.caseDiameter + ' mm' : ''}`
        },
        {
          'WATER-PROOF': `${this.watch.waterResistance ? this.watch.waterResistance + ' atm' : ''}`
        },
        {
          'BEZEL MATERIAL': `${this.watch.caseBezelMaterial ? this.watch.caseBezelMaterial : ''}`
        },
        {
          'CRYSTAL': `${this.watch.caseFront ? this.watch.caseFront : ''}`
        }
      ]
    }, {
      name: 'CERTIFICATION',
      attributes: [{
        '': `${this.watch.movementCertificate ? this.watch.movementCertificate + ',' : ''} ${this.watch.awards ? this.watch.awards : ''}`
      }]
    }, {
      name: 'BAND',
      attributes: [{
        'BRACELET': `${this.watch.band ? this.watch.band : ''}`
      },
      {
        'BAND MATERIAL': `${this.watch.bandMaterial ? this.watch.bandMaterial : ''}`
      },
      {
        'CLASP TYPE': `${this.watch.bandClasp ? this.watch.bandClasp : ''}`
      },
      {
        'CLASP COLOR': `${this.watch.bandColour ? this.watch.bandColour : ''}`
      }
      ]
    }, {
      name: 'DIAL',
      attributes: [{
        'DIAL COLOR': `${this.watch.dialColour ? this.watch.dialColour : ''}`
      },
      {
        'DIAL FINISH': `${this.watch.dialFinish ? this.watch.dialFinish : ''}`
      },
      {
        'DIAL INDEXES': `${this.watch.dialIndex ? this.watch.dialIndex : ''}`
      },
      {
        'DIAL HANDS': `${this.watch.dialHands ? this.watch.dialHands : ''}`
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
