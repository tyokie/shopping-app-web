import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { ProductService } from './product.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import { Http, BaseRequestOptions, RequestMethod, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { IItem } from './shared/item.model';
import { IRecommendation } from './shared/recommendation.model';
import { IProduct } from './shared/product.model';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (mockBackend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(mockBackend, defaultOptions);
  }
};

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: Http, useValue: mockHttpProvider },
        MockBackend,
        BaseRequestOptions,
        { provide: XHRBackend, useValue: MockBackend }
      ]
    });
  });

  it('should have the right location to the JSON payload', inject([ProductService], (productService: ProductService) => {
    expect(productService).toBeTruthy();
    expect(productService.URL).toEqual('assets/payload.json');
  }));


  it('should get customer summary', inject(
    [ProductService, MockBackend],
    fakeAsync((productService: ProductService, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {

        return productService.getProductsSummary().toPromise().then( (result) => {
          expect(result.length).toBeGreaterThan(0);
        } );

      });
  })));

  it('should use an HTTP call to servers and return items', inject(
    [ProductService, MockBackend],
    fakeAsync((productService: ProductService, mockBackend: MockBackend) => {

      let result: IProduct[]; ///
      const mockResponse = {
        products: [
          {
            "recommendation":{
              "currentLevel":79,
              "maxLevel":100
            },
            "items":[
              {
                "id":"10600",
                "title":"Hampton Cookset - 8 Piece",
                "category":"STAINLESS STEEL",
                "imageUrl": "http://localhost/img/001.jpg",
                "unitsInCartons": 10,
                "unitCost":4.52,
                "packSize":10,
                "secondaryCategory":"Chairs"
              }
            ]
          },
          {
            "recommendation":{
              "currentLevel":79,
              "maxLevel":100
            },
            "items":[
              {
                "id":"10870",
                "title":"MELAMINE BOWL",
                "category":"BOWLS",
                "imageUrl":"http://localhost/img/001.jpg",
                "unitsInCartons":6,
                "unitCost":0.93,
                "packSize":5,
                "secondaryCategory":"Kids Home"
              },
              {
                "id":"10820",
                "title":"PP YUM YUM CUP",
                "category":"CUPS/MUGS",
                "imageUrl":"http://localhost/img/002.jpg",
                "unitsInCartons":12,
                "unitCost":0.7,
                "packSize":25,
                "secondaryCategory":"Kids Home"
              }
            ]
          }
        ]
      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));

        productService.getProductsSummary().subscribe((products) => {
          result = <IProduct[]>products.json().products;
          expect(result.length).toEqual(2);
          expect(result[0].recommendation.currentLevel).toBe(80);
          expect(result[0].recommendation.maxLevel).toEqual(100);
          expect(result[1].recommendation).toBe({"currentLevel":79, "maxLevel":100});
          expect(result[1].items.length).toBe(2, 'Unexpected number of items.')
        });
      });
    })));


});
