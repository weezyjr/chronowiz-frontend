import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSiemaComponent, NgxSiemaSlideComponent } from './siema.component';
import { NgxSiemaService } from './siema.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NgxSiemaComponent,
    NgxSiemaSlideComponent,
  ],
  exports: [
    NgxSiemaComponent,
    NgxSiemaSlideComponent,
  ],
})
export class NgxSiemaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NgxSiemaModule,
      providers: [
        NgxSiemaService,
      ],
    };
  }
}
