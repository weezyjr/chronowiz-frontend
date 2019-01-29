import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './Admin/Views/login/login.component';
import { AdminGuard } from './Auth/Admin.guard';
import { AddWatchFormComponent } from './Admin/Views/add-watch-form/add-watch-form.component';
import { AddBrandFormComponent } from './Admin/Views/add-brand-form/add-brand-form.component';
import { AddCollectionFormComponent } from './Admin/Views/add-collection-form/add-collection-form.component';
import { HomeComponent } from './Views/home/home.component';
import { BrandComponent } from './Views/brand/brand.component';
import { CollectionsComponent } from './Views/collections/collections.component';
import { WatchComponent } from './Views/watch/watch.component';
import { RetailerGuard } from './Auth/RetailerAuth.guard';
import { RetailerLoginComponent } from './Retailer/Views/login/login.component';
import { AddRetialerFormComponent } from './Admin/Views/add-retialer-form/add-retialer-form.component';
import { AddToStockComponent } from './Retailer/Views/add-to-stock/add-to-stock.component';
import { InStockComponent } from './Retailer/Views/in-stock/in-stock.component';
import { RegisterComponent } from './Views/register/register.component';
import { LoginComponent } from './Views/login/login.component';
import { ProfileComponent } from './User/Views/profile/profile.component';
import { UserGuard } from './Auth/User.guard';
import { SearchComponent } from './Views/search/search.component';
import { AdvancedSearchComponent } from './Views/search/advanced-search/advanced-search.component';
import { ResetPasswordComponent } from './Views/reset-password/reset-password.component';
import { SetNewPasswordComponent } from './User/Views/set-new-password/set-new-password.component';
import { WatchTrayComponent } from './Views/watch-tray/watch-tray.component';
import { CheckoutComponent } from './Views/checkout/checkout.component';
import { AboutUsComponent } from './Views/about-us/about-us.component';
import { TermsConditionsComponent } from './Views/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './Views/contact-us/contact-us.component';
import { EducationComponent } from './Views/education/education.component';
import { WaterResistanceComponent } from './Views/education/water-resistance/water-resistance.component';
import { EditPersonalInfoComponent } from './User/Views/edit-personal-info/edit-personal-info.component';
import { EditPaymentInfoComponent } from './User/Views/edit-payment-info/edit-payment-info.component';
import { EditAddressInfoComponent } from './User/Views/edit-address-info/edit-address-info.component';
import { ShippingComponent } from './Views/checkout/shipping/shipping.component';
import { OrderComponent } from './Views/checkout/order/order.component';
import { ConfirmationComponent } from './Views/checkout/confirmation/confirmation.component';
import { PaymentComponent } from './Views/checkout/payment/payment.component';
import { ShippingGuard } from './Auth/Shipping.guard';
import { ConfirmationGuard } from './Auth/Confirmation.guard';
import { PaymentGuard } from './Auth/Payment.guard';
import { ResetPasswordGuard } from './Auth/resetPassword.guard';
import { OrderGuard } from './Auth/order.guard';
import { OrdersFormComponent } from './Admin/Views/orders-form/orders-form.component';
import { EditUserFormComponent } from './Admin/Views/edit-user-form/edit-user-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'shipping',
    component: ShippingComponent,
    canActivate: [ShippingGuard]
  },
  {
    path: 'about',
    component: AboutUsComponent
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate: [OrderGuard]
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    canActivate: [ConfirmationGuard]
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
    component: PaymentComponent,
    canActivate: [PaymentGuard]
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
    redirectTo: 'admin/watch',
    pathMatch: 'full',
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/watch',
    component: AddWatchFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/brand',
    component: AddBrandFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/collection',
    component: AddCollectionFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/orders',
    component: OrdersFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/users',
    component: EditUserFormComponent,
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
    path: 'admin/retailer',
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
    path: 'account/edit-personal-info',
    component: EditPersonalInfoComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'account/edit-payment-info',
    component: EditPaymentInfoComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'account/edit-address-info',
    component: EditAddressInfoComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'account/set-new-password',
    component: SetNewPasswordComponent,
    canActivate: [ResetPasswordGuard]
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
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
