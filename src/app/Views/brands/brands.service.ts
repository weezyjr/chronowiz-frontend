import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from 'src/app/API/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { ResponseData } from 'src/app/API/response-data';
import { Brand } from 'src/app/Types/brand';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Link } from 'src/app/Types/Link';
import { Collection } from 'src/app/Types/collection';
import { Watch } from 'src/app/Types/watch';

const _constUrls_: Link[] = [
  new Link('Home', '/home'),
  new Link('Brands', '/home')
];

const _httpOptions_: { headers: HttpHeaders } = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private _env_: string = environment.backendUrl;

  private _brandsUrl_: string = this._env_ + 'user/brands/';
  private _collectionsUrl_: string = this._env_ + 'user/collections/';
  private _watchesUrl_: string = this._env_ + 'user/watches/';

  private _currentBrand_: BehaviorSubject<Brand>;
  private _currentCollection_: BehaviorSubject<Collection>;
  private _currentWatch_: BehaviorSubject<Watch>;

  private _urlSequence_: BehaviorSubject<Link[]>;

  set currentBrand(brand: Brand) {
    if (brand && brand.name) {
      if (this.currentBrand) {
        this._currentBrand_.next(brand);
      } else {
        this._currentBrand_ = new BehaviorSubject(brand);
      }
      this.urlSequence = [];
      const brandLink: Link = new Link(brand.name, `/brand/${brand.name}`);
      this.urlSequence = [..._constUrls_, brandLink];
    }
  }

  get currentBrand(): Brand | undefined {
    if (this._currentBrand_) {
      return this._currentBrand_.getValue();
    } else {
      return undefined;
    }
  }

  set currentCollection(collection: Collection) {
    if (collection && collection._id) {
      if (this.currentCollection) {
        this._currentCollection_.next(collection);
      } else {
        this._currentCollection_ = new BehaviorSubject(collection);
      }

      this.urlSequence = [];

      if (collection.brandObject && collection.brandObject.name) {

        // generate brand link from collection object
        const brandLink: Link = new Link(collection.brandObject.name, `/brand/${collection.brandObject.name}`);

        // generate collection link from collection object
        let collectionLink: Link;
        if (collection.name && collection.name !== 'UNDEFINED') {
          collectionLink = new Link(collection.name, `${brandLink.url}/${collection._id}`);
        } else {
          collectionLink = new Link('Collection', `${brandLink.url}/${collection._id}`);
        }

        this.urlSequence = [..._constUrls_, brandLink, collectionLink];

      }
    }
  }

  get currentCollection(): Collection | undefined {
    if (this._currentCollection_) {
      return this._currentCollection_.getValue();
    } else {
      return undefined;
    }
  }

  get currentWatch(): Watch | undefined {
    if (this._currentWatch_) {
      return this._currentWatch_.getValue();
    } else {
      return undefined;
    }
  }


  set currentWatch(watch: Watch) {
    if (watch && watch.referenceNumber) {
      if (this.currentWatch) {
        this._currentWatch_.next(watch);
      } else {
        this._currentWatch_ = new BehaviorSubject(watch);
      }

      this.urlSequence = [];

      if (watch.brandObject &&
        watch.brandObject.name &&
        watch.collectionObject &&
        watch.collectionObject._id) {

        // generate brand link from watch object
        const brandLink = new Link(watch.brandObject.name, `/brand/${watch.brandObject.name}`);

        // generate collection link from watch object
        let collectionLink: Link;
        if (watch.collectionObject.name && watch.collectionObject.name !== 'UNDEFINED') {
          collectionLink = new Link(watch.collectionObject.name,
            `${brandLink.url}/${watch.collectionObject._id}`);
        } else {
          collectionLink = new Link('Collection',
            `${brandLink.url}/${watch.collectionObject._id}`);
        }

        // generate watch link from watch object
        const watchLink: Link = new Link(`${watch.referenceNumber}`,
          `${brandLink.url}/${collectionLink.url}/${watch.referenceNumber}`);


        this.urlSequence = [..._constUrls_, brandLink, collectionLink, watchLink];

      }
    }
  }

  get urlSequence(): Link[] {
    if (this._urlSequence_) {
      return this._urlSequence_.getValue();
    } else {
      return _constUrls_;
    }
  }

  set urlSequence(link: Link[]) {
    if (this._urlSequence_) {
      this._urlSequence_.next(link);
    } else {
      this._urlSequence_ = new BehaviorSubject(link);
    }
  }

  addToUrlSequence(link: Link): void {
    if (this.urlSequence) {
      this.urlSequence.push(link);
    } else {
      this.urlSequence = [link];
    }
  }

  removeLastFromUrlSequence(): void {
    if (this.urlSequence) {
      this.urlSequence.pop();
    }
  }

  filterCollectionByGender(collections: Collection[], gender: string | String): Collection[] | undefined {
    if (!collections) {
      return undefined;
    }
    if (!gender || gender === 'All') {
      return collections;
    }
    else {
      return collections.filter((collection: Collection) => {
        if (collection.watchObjects) {
          const filteredCollection = collection.watchObjects.filter((watch: Watch) => {
            return watch.gender === gender;
          });
          if (filteredCollection) {
            return filteredCollection.length > 0;
          }
          else {
            return false;
          }
        }
      });
    }
  }

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandlerService) {
    httpErrorHandler.createHandleError('BrandsServiceService');
  }

  readBrandByName(name: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this._brandsUrl_ + '/' + name, _httpOptions_)
      .pipe(map(data => {
        return data;
      }));
  }

  readAllBrands(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this._brandsUrl_, _httpOptions_)
      .pipe(map(data => {
        return data;
      }));
  }

  readBrandById(id: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this._brandsUrl_ + '/' + id, _httpOptions_)
      .pipe(map(data => {
        return data;
      }));
  }

  readCollectionById(id: String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this._collectionsUrl_ + '/' + id, _httpOptions_)
      .pipe(map(data => {
        return data;
      }));
  }

  readAllCollections(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this._collectionsUrl_, _httpOptions_)
      .pipe(map(data => {
        return data;
      }));
  }

  readWatchByRef(ref: string | String): Observable<ResponseData> {
    return this.http.get<ResponseData>(this._watchesUrl_ + '/' + ref, _httpOptions_)
      .pipe(map(data => {
        return data;
      }));
  }

  readAllWatches(): Observable<ResponseData> {
    return this.http.get<ResponseData>(this._watchesUrl_, _httpOptions_)
      .pipe(map(data => {
        return data;
      }));
  }

}
