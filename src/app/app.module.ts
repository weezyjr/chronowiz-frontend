import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorInterceptor } from './API/error.interceptor';
import { ItemCardComponent } from './Components/item-card/item-card.component';
import { HomeComponent } from './Views/home/home.component';
import { FormHeaderComponent } from './Components/forms/form-header/form-header.component';
import { TabsComponent } from './Components/forms/tabs/tabs.component';
import { ToggleBtnComponent } from './Components/toggle-btn/toggle-btn.component';
import { RegisterComponent } from './Views/register/register.component';
import { LoginComponent } from './Views/login/login.component';
import { SearchComponent } from './Views/search/search.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { AdvancedSearchComponent } from './Views/search/advanced-search/advanced-search.component';
import { ConfirmPasswordDirective } from './Views/register/confirmPassword.directive';
import { ResetPasswordComponent } from './Views/reset-password/reset-password.component';
import { WatchTrayComponent } from './Views/watch-tray/watch-tray.component';
import { CheckoutComponent } from './Views/checkout/checkout.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { AdminSelectionComponent } from './Components/admin-selection/admin-selection.component';
import { RetailerLoginComponent } from './Retailer/Views/login/login.component';
import { AddRetialerFormComponent } from './Admin/Views/add-retialer-form/add-retialer-form.component';
import { AddToStockComponent } from './Retailer/Views/add-to-stock/add-to-stock.component';
import { InStockComponent } from './Retailer/Views/in-stock/in-stock.component';
import { ProfileComponent } from './User/Views/profile/profile.component';
import { SetNewPasswordComponent } from './User/Views/set-new-password/set-new-password.component';
import { AddWatchFormComponent } from './Admin/Views/add-watch-form/add-watch-form.component';
import { AdminLoginComponent } from './Admin/Views/login/login.component';
import { AddBrandFormComponent } from './Admin/Views/add-brand-form/add-brand-form.component';
import { AddCollectionFormComponent } from './Admin/Views/add-collection-form/add-collection-form.component';
import { HttpErrorHandlerService } from './API/http-error-handler.service';
import { AuthenticationService } from './Auth/Authentication.service';
import { RetailerService } from './Retailer/retailer.service';
import { AdminService } from './Admin/admin.service';
import { AccordionComponent } from './Components/accordion/accordion.component';
import { AboutUsComponent } from './Views/about-us/about-us.component';
import { TermsConditionsComponent } from './Views/terms-conditions/terms-conditions.component';
import { ContactUsComponent } from './Views/contact-us/contact-us.component';
import { EducationComponent } from './Views/education/education.component';
import { WaterResistanceComponent } from './Views/education/water-resistance/water-resistance.component';
import { EditPersonalInfoComponent } from './User/Views/edit-personal-info/edit-personal-info.component';
import { EditPaymentInfoComponent } from './User/Views/edit-payment-info/edit-payment-info.component';
import { EditAddressInfoComponent } from './User/Views/edit-address-info/edit-address-info.component';
import { OrderConfirmationComponent } from './Components/order-confirmation/order-confirmation.component';
import { ShippingComponent } from './Views/checkout/shipping/shipping.component';
import { PaymentComponent } from './Views/checkout/payment/payment.component';
import { ConfirmationComponent } from './Views/checkout/confirmation/confirmation.component';
import { OrderComponent } from './Views/checkout/order/order.component';
import { SearchService } from './User/Services/Search/search.service';
import { WatchTrayService } from './User/Services/WatchTray/watch-tray.service';
import { CheckoutService } from './User/Services/WatchTray/checkout.service';
import { OrderService } from './User/Services/WatchTray/order.service';
import { ContactUsService } from './User/Services/ContactUs/contactUs.service';
import { EditUserFormComponent } from './Admin/Views/edit-user-form/edit-user-form.component';
import { OrdersFormComponent } from './Admin/Views/orders-form/orders-form.component';
import { UIcomponentsModule } from './uicomponents/uicomponents.module';
import { BrandsModule } from './Views/brands/brands.module';
@NgModule({
  declarations: [
    ConfirmPasswordDirective,
    AppComponent,
    AddWatchFormComponent,
    AdminLoginComponent,
    RetailerLoginComponent,
    AddBrandFormComponent,
    AddCollectionFormComponent,
    AppComponent,
    ItemCardComponent,
    HomeComponent,
    AddRetialerFormComponent,
    FormHeaderComponent,
    TabsComponent,
    AddToStockComponent,
    ToggleBtnComponent,
    InStockComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    CarouselComponent,
    AdvancedSearchComponent,
    ResetPasswordComponent,
    SetNewPasswordComponent,
    WatchTrayComponent,
    CheckoutComponent,
    AdminSelectionComponent,
    ShippingComponent,
    AccordionComponent,
    PaymentComponent,
    AboutUsComponent,
    ConfirmationComponent,
    TermsConditionsComponent,
    ContactUsComponent,
    EducationComponent,
    WaterResistanceComponent,
    OrderComponent,
    EditPersonalInfoComponent,
    EditPaymentInfoComponent,
    EditAddressInfoComponent,
    OrderConfirmationComponent,
    EditUserFormComponent,
    OrdersFormComponent
  ],
  imports: [
    UIcomponentsModule,
    BrandsModule,
    NgSelectModule,
    Ng5SliderModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header'
    }),
    FormsModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(
      {
        timeOut: 30000
      }
    )
  ],
  exports: [RouterModule],
  providers: [
    ContactUsService,
    OrderService,
    HttpErrorHandlerService,
    SearchService,
    WatchTrayService,
    CheckoutService,
    AuthenticationService,
    RetailerService,
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
