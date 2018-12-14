import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './Search/search-page/search-page.component';
import { WatchDetailsComponent } from './Watch/watch-details/watch-details.component';
import { LoginComponent } from './Admin/login/login.component';
import { AuthGuard } from './Auth/auth.guard';
import { AddWatchFormComponent } from './Admin/add-watch-form/add-watch-form.component';
import { AddBrandFormComponent } from './Admin/add-brand-form/add-brand-form.component';
import { AddCollectionFormComponent } from './Admin/add-collection-form/add-collection-form.component';
import { HomeComponent } from './pages/home/home.component';
import { BrandComponent } from './pages/brand/brand.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { WatchComponent } from './pages/watch/watch.component';
import { RetailerGuard } from './Auth/retailerAuth.guard';
import { RetailerLoginComponent } from './Retailer/login/login.component';
import { AddRetialerFormComponent } from './Admin/add-retialer-form/add-retialer-form.component';
import { AddToStockComponent } from './Retailer/add-to-stock/add-to-stock.component';
import { InStockComponent } from './Retailer/in-stock/in-stock.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'brand',
    children: [{
      path: ':name/:id/:ref',
      component: WatchComponent
    }, {
      path: ':name/:id',
      component: CollectionsComponent
    },
    {
      path: ':name',
      component: BrandComponent
    }]
  },
  {
    path: 'collections/:id',
    component: CollectionsComponent
  },
  {
    path: 'watch/:ref',
    component: WatchComponent
  },
  {
    path: 'app-search-page',
    component: SearchPageComponent
  },
  {
    path: 'app-watch-details',
    component: WatchDetailsComponent
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin',
    redirectTo: 'app-add-watch-form',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'app-add-watch-form',
    component: AddWatchFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app-add-brand-form',
    component: AddBrandFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app-add-collection-form',
    component: AddCollectionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'retailer',
    redirectTo: 'retailer/add-to-stock',
    pathMatch: 'full',
    canActivate: [RetailerGuard]
  },
  {
    path: 'retailer/login',
    component: RetailerLoginComponent
  },
  {
    path: 'retailer/add-to-stock',
    component: AddToStockComponent,
    canActivate: [RetailerGuard]
  },
  {
    path: 'retailer/in-stock',
    component: InStockComponent,
    canActivate: [RetailerGuard]
  },
  {
    path: 'app-add-retailer-form',
    component: AddRetialerFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
