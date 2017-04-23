import { Injectable } from '@angular/core';

import { ProductModel } from './shared/product.model';


@Injectable()
export class LocalStorageService {

  private _products = [];
  private _productOrders = []; //TODO: complete selected orders implementation

  public get products() {
    return this._products;
  }

  public set products(items) {
    this._products = items;
  }

  constructor() {
    let persistedProducts = JSON.parse(localStorage.getItem('shopping-products')) || [];

    this._products = persistedProducts.map((product) => {
      return new ProductModel(product);
    });
  }

  public retrieve () {
    //TODO: get from localStorage if set, otherwise load from ProductService
    if(this.products.length === 0) {
      this.products = JSON.parse(localStorage.getItem('shopping-products')) || [];
    }
    //TODO: if still empty, load from ProductService & set to property

    return this.products;
  }

  add(product) {
    this._products.push(new ProductModel(product));
    this.persist();
  }

  remove(uid) {
    let product = this._findByUid(uid);

    if (product) {
      this.products.splice(this.products.indexOf(product), 1);
      this.persist();
    }
  }

  persist() {  //to be used after removing or adding an item from list
    this._clearCache();
    //TODO: hash items first before adding them to localStorage
    localStorage.setItem('shopping-products', JSON.stringify(this.products));
  }

  _findByUid(uid) {
    return this.products.find((product) => product.uid == uid);
  }

  _clearCache() {
    //this._products = [];
    //this._productOrders = null;
  }

}
