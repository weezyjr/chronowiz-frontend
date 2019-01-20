import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './Admin/Views/login/login.component';
import { AdminGuard } from './Auth/admin.guard';
import { AddWatchFormComponent } from './Admin/Views/add-watch-form/add-watch-form.component';
import { AddBrandFormComponent } from './Admin/Views/add-brand-form/add-brand-form.component';
import { AddCollectionFormComponent } from './Admin/Views/add-collection-form/add-collection-form.component';
import { HomeComponent } from './Views/home/home.component';
import { BrandComponent } from './Views/brand/brand.component';
import { CollectionsComponent } from './Views/collections/collections.component';
import { WatchComponent } from './Views/watch/watch.component';
import { RetailerGuard } from './Auth/retailerAuth.guard';
import { RetailerLoginComponent } from './Retailer/Views/login/login.component';
import { AddRetialerFormComponent } from './Admin/Views/add-retialer-form/add-retialer-form.component';
import { AddToStockComponent } from './Retailer/Views/add-to-stock/add-to-stock.component';
import { InStockComponent } from './Retailer/Views/in-stock/in-stock.component';
import { RegisterComponent } from './Views/register/register.component';
import { LoginComponent } from './Views/login/login.component';
import { ProfileComponent } from './User/Views/profile/profile.component';
import { UserGuard } from './Auth/user.guard';
import { SearchComponent } from './Views/search/search.component';
import { AdvancedSearchComponent } from './Views/search/advanced-search/advanced-search.component';
import { ResetPasswordComponent } from './Views/reset-password/reset-password.component';
import { SetNewPasswordComponent } from './User/Views/set-new-password/set-new-password.component';
import { WatchTrayComponent } from './Views/watch-tray/watch-tray.component';
import { CheckoutComponent } from './Views/checkout/checkout.component';
import { ShippingComponent } from './Views/shipping/shipping.component';
import { PaymentComponent } from './Views/payment/payment.component';
import { AboutUsComponent } from './Views/about-us/about-us.component';
import { ConfirmationComponent } from './Views/confirmation/confirmation.component';
import { TermsConditionsComponent } from './Views/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './Views/contact-us/contact-us.component';
import { EducationComponent } from './Views/education/education.component';
import { WaterResistanceComponent } from './Views/education/water-resistance/water-resistance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'shipping',
    component: ShippingComponent
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsComponent
  },
  {
    path: 'education',
    component: EducationComponent
  },
  {
    path: 'education/water-resistance',
    component: WaterResistanceComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
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
    path: 'collection/:id',
    component: CollectionsComponent
  },
  {
    path: 'watch/:ref',
    component: WatchComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search/advanced-search',
    component: AdvancedSearchComponent,
    children: [{
      path: ':query',
      component: SearchComponent
    }]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    redirectTo: 'app-add-watch-form',
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'app-add-watch-form',
    component: AddWatchFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'app-add-brand-form',
    component: AddBrandFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'app-add-collection-form',
    component: AddCollectionFormComponent,
    canActivate: [AdminGuard]
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
    canActivate: [AdminGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'set-new-password',
    component: SetNewPasswordComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'watch-tray',
    component: WatchTrayComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
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
