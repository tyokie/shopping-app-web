import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

let product = [{
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
}];

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  afterEach( inject([LocalStorageService], (localStorageService: LocalStorageService) => {
    localStorageService.products = []; //TODO: investigate why afterEach is not having effect
  }));

  it('should instantiate LocalStorage service', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should add a product to the cache storage', inject([LocalStorageService], (localStorageService: LocalStorageService) => {
    localStorageService.products = [];
    localStorageService.add(product);

    expect(localStorageService.products.length).toBe(1);
    //TODO: test item in browser cache matches
  }));

  it('should retrieve products from cache successfully', inject([LocalStorageService], (localStorageService: LocalStorageService) => {
    localStorageService.products = [];
    localStorageService.add(product);
    let uid = localStorageService.products[0]._uid;
    localStorageService.products = [];

    expect(localStorageService.retrieve().length).toBe(1);
  }));

  it('should remove products from cache successfully', inject([LocalStorageService], (localStorageService: LocalStorageService) => {
    localStorageService.products = [];
    localStorageService.add(product);
    let uid = localStorageService.products[0]._uid;

    localStorageService.remove(uid);

    expect(localStorageService._findByUid(uid)).toBeUndefined();

  }));

});
