/**
 * Created by Tawanda Kamuzonde on 22/4/17.
 */

import { Item } from './item.model';
import { Recommendation } from './recommendation.model';

import * as uuid from 'node-uuid';

export interface IProduct
{
  recommendation: Recommendation;
  items: Item[];
}

export class ProductModel implements IProduct
{
  private _uid;
  private _recommendation;
  private _items;

  public get recommendation () {
    return this._recommendation;
  }

  public set recommendation (item) {
    this._recommendation = item;
  }

  public get items () {
    return this._items;
  }

  public set items(item) {
    this._items = item;
  }

  public get uid () {
    return this._uid;
  }

  public set uid(uuid) {
    this._uid = uuid;
  }

  constructor (product) {
    this._uid = uuid.v4();
    this.recommendation = product.recommendation;
    this.items = product.items;
  }

}
