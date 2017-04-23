import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable'
import { IItem } from './shared/item.model';
import { IRecommendation } from './shared/recommendation.model';
import { IProduct, ProductModel } from './shared/product.model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class ProductService {

  private _url: string = 'assets/payload.json';

  public get URL():string {
    return this._url;
  }

  constructor(private _http: Http, private _localStorageService: LocalStorageService) { }

  getProductsSummary(): Observable <any> {
    return this._http.get(this._url)
      .map((res: Response) => {
        let data = res.json().products;
        this._localStorageService.products = data.map((product) => {
          return new ProductModel(product);
        });
        return <IProduct[]>data; //maybe change this
      })
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
