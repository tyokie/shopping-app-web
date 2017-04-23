import { ProductService } from './product.service'
import { IProduct } from './shared/product.model';
import { Observable } from "rxjs";

describe('ProductService Isolated', () => {
  let mockHttp,
      mocklocalStorageService,
      productService;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get']);
    productService = new ProductService(mockHttp, mocklocalStorageService);

  });

  it('should have the right location to the JSON payload', () => {
    expect(productService).toBeTruthy();
    expect(productService.URL).toEqual('assets/payload.json');
  });

  it('should throw error accurately', () => {
    let error = {
      json: ()=>{ return {error: null} }
    };
    expect(productService.handleError(error).error).toBe('Server error');
  });

  it('should get customers summary', () => {
    mockHttp.get.and.returnValue(Observable.of(false));

   expect(productService.getProductsSummary()).toBeTruthy();
  });

});
