import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from '../brand/brand.component';
import { SingleBrandComponent } from '../single-brand/single-brand.component';
import { CollectionComponent } from '../collection/collection.component';
import { WatchComponent } from '../watch/watch.component';

const routes: Routes = [
  {
    path: 'brand',
    children: [
      {
        path: ':name',
        component: BrandComponent,
        children: [
          { path: '', component: SingleBrandComponent }]
      }, {
        path: ':name/:id',
        component: CollectionComponent
      }, {
        path: ':name/:id/:ref', component: WatchComponent
      }]
  },
  {
    path: 'collection/:id',
    component: CollectionComponent
  },
  {
    path: 'watch/:ref',
    component: WatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModuleModule { }
