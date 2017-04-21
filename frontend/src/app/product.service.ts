import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ProductService {

  private _url: string = 'assets/payload.json';

  constructor(private _http: Http) { }

  getCustomersSummary(): Observable <any> {
    return this._http.get(this._url);
    //.map( (res: Response) => {res.json().data} );
  }

  handleError(error: any) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
