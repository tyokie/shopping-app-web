import { TestBed, inject } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService]
    });
  });

  // it('should ...', inject([ProductService], (service: ProductService) => {
  //   //expect(service).toBeTruthy();
  //   expect(service._url).toEqual('assets/payload.json');
  // }));

});
