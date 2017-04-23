import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { IItem } from './shared/item.model';
import { IRecommendation } from './shared/recommendation.model';
import { IProduct } from './shared/product.model';

@Injectable()
export class ProductService {

  private _url: string = 'assets/payload.json';

  public get URL():string {
    return this._url;
  }

  constructor(private _http: Http) { }

  getProductsSummary(): Observable <any> {
    return this._http.get(this._url)
      .map( (res: Response) => {<IProduct[]>res.json().products} );
  }

  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
