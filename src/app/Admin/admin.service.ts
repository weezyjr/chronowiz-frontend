import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HandleError, HttpErrorHandlerService } from '../API/http-error-handler.service';
import { ResponseData } from '../API/response-data';
import { AuthenticationService } from '../Auth/Authentication.service';
import { Brand } from '../Types/brand';
import { Collection } from '../Types/collection';
import { Watch } from '../Types/watch';
import { Retailer, BrandDiscount, CollectionDiscount, WatchDiscount } from '../Types/retailer';
import { User } from '../Types/User';

export interface FormStoreValues {
  mode: 'create' | 'update' | 'delete';
  selectedId: string;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  env = environment;

  private brandsUrl = this.env.backendUrl + 'admin/brands';
  private collectionsUrl = this.env.backendUrl + 'admin/collections';
  private watchesUrl = this.env.backendUrl + 'admin/watches';
  private retailerAdminUrl = this.env.backendUrl + 'admin/retailers';
  private retailerBrandMaxDiscountUrl = this.retailerAdminUrl + '/brandMaxDiscount';
  private retailerCollectionMaxDiscountUrl = this.retailerAdminUrl + '/collectionMaxDiscount';
  private retailerWatchMaxDiscountUrl = this.retailerAdminUrl + '/watchMaxDiscount';
  private usersUrl = this.env.backendUrl + 'admin/users/';
  private ordersUrl = this.env.backendUrl + 'admin/orders/';
  private formStoreValues: FormStoreValues = {
    mode: 'create',
    selectedId: ''
  };


  private handleError: HandleError;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT `
    })
  };

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService,
    authenticationService: AuthenticationService) {
    this.handleError = httpErrorHandler.createHandleError('BrandsService');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `JWT ${authenticationService.currentAdminValue.jwt}`
      })
    };
  }

  /**
   *
   * @param store form
   */

  store(formname: string, mode: 'create' | 'update' | 'delete', selectionId?: string) {
    this.formStoreValues.mode = mode;
    if (selectionId) {
      this.formStoreValues.selectedId = selectionId;
    }
    console.log(this.formStoreValues);
    sessionStorage.setItem(formname, JSON.stringify(this.formStoreValues));
  }

  clearStore(formname: string) {
    sessionStorage.removeItem(formname);
  }

  getStore(formname: string): FormStoreValues {
    return <FormStoreValues>JSON.parse(sessionStorage.getItem(formname));
  }

  /**
   * @param Brand APIS
   */

  createBrand(brand: Brand): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.brandsUrl, { 'payload': brand }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readBrandById(id: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.brandsUrl + '/' + id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteBrandById(id: String): Observable<ResponseData> {
    return this.http.delete<ResponseData>(this.brandsUrl + '/' + id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readBrandByName(name: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.brandsUrl + '/' + name, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readAllBrands(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.brandsUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateBrand(brandObject: any, id: String): Observable<ResponseData> {
    return this.http.put<ResponseData>(this.brandsUrl + '/' + id, { 'payload': brandObject }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  /**
   * @param Collections APIS
   */

  createCollection(collection: Collection): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.collectionsUrl, { 'payload': collection }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readCollectionById(id: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.collectionsUrl + '/' + id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteCollectionById(id: String): Observable<ResponseData> {
    return this.http.delete<ResponseData>(this.collectionsUrl + '/' + id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateCollectionById(collectionObject: any, id: String): Observable<ResponseData> {
    return this.http.put<ResponseData>(this.collectionsUrl + '/' + id, { 'payload': collectionObject }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readAllCollections(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.collectionsUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  /**
   * @param Watch APIS
   */

  createWatch(watch: Watch): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.watchesUrl, { 'payload': watch }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readWatch(_id: string): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.watchesUrl + '/' + _id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateWatch(watchObject: any, id: String): Observable<ResponseData> {
    return this.http.put<ResponseData>(this.watchesUrl + '/' + id, { 'payload': watchObject }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteWatch(_id: string): Observable<ResponseData> {
    return this.http.delete<ResponseData>(this.watchesUrl + '/' + _id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  readWatches(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.watchesUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  /**
   * @param Retailer APIS
   */

  createRetailer(retailer: Retailer): Observable<ResponseData> {
    return this.http.post<ResponseData>(this.retailerAdminUrl, { 'payload': retailer }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateRetailer(retailer: Retailer): Observable<ResponseData> {
    return this.http.put<ResponseData>(this.retailerAdminUrl + '/' + retailer._id, { 'payload': retailer }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getRetailerByEmail(email: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this.retailerAdminUrl + '/' + email, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteRetailer(retailer: Retailer): Observable<ResponseData> {
    return this.http.delete<ResponseData>(this.retailerAdminUrl + '/' + retailer._id, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateRetailerBrandMaxDiscount(retailerId: string, discount: BrandDiscount) {
    return this.http.put<ResponseData>(this.retailerBrandMaxDiscountUrl + '/' + retailerId,
      { 'payload': discount }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }


  updateRetailerCollectionMaxDiscount(retailerId: string, discount: CollectionDiscount) {
    return this.http.put<ResponseData>(this.retailerCollectionMaxDiscountUrl + '/' + retailerId,
      { 'payload': discount }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }



  updateRetailerWatchMaxDiscount(retailerId: string, discount: WatchDiscount) {
    return this.http.put<ResponseData>(this.retailerWatchMaxDiscountUrl + '/' + retailerId,
      { 'payload': discount }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  /** @param User APIs */

  updateUser(userId: string, user: User) {
    return this.http.put<ResponseData>(this.usersUrl + '/' + userId,
      { 'payload': user }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getAllUsers() {
    return this.http.get<ResponseData>(this.usersUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getUserByEmail(userEmail: string) {
    return this.http.get<ResponseData>(this.usersUrl + '/' + userEmail, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }



  /** @param Order APIs */

  updateOrder(orderId: string, status: string) {
    return this.http.put<ResponseData>(this.ordersUrl + '/' + orderId,
      { 'payload': { status } }, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getAllOrders() {
    return this.http.get<ResponseData>(this.ordersUrl, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  getOrderByNumber(orderNumber: string) {
    return this.http.get<ResponseData>(this.ordersUrl + '/' + orderNumber, this.httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }


}
