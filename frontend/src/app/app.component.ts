import {Component, OnInit} from '@angular/core';

import { ProductService } from './product.service';
import { MdCard, MdMenu, MdButton } from '@angular/material';
import { Item } from './shared/item.model';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  products: any[];
  totalProducts: number;
  totalCost: number;
  shoppingCart: Item[];
  cartonsForm:FormGroup;
  layoutView: string;

  constructor (private _productService: ProductService) {
    this.totalProducts = 0;
    this.totalCost = 0;
    this.shoppingCart = [];
    this.layoutView = 'grid';
  }

  ngOnInit () {
    let noOfCartons = new FormControl('',
      Validators.compose([Validators.minLength(1), Validators.maxLength(100)])
    );
    let cartonsForm = new FormGroup({ noOfCartons: noOfCartons });

    this._productService.getProductsSummary().subscribe(( products ) => {
      console.log(products);
      this.products = products;
    });
  }

  //TODO: revisit buggy
  recalculateTotals()
  {
    this.totalProducts = 0
    this.totalCost = 0;
    let total = 0;
    this.shoppingCart.map((cartItem) => {
      if(cartItem.noOfCartons !== 0 || cartItem.noOfCartons !== '')
      {
        total += (cartItem.unitsInCartons * cartItem.packSize);
        this.totalCost += (cartItem.unitsInCartons * cartItem.unitCost * cartItem.noOfCartons);
      }
    });
    this.totalProducts = total;
    console.log(this.shoppingCart);
  }

  calculatePackCost(item): number
  {
    return item.unitsInCartons * item.unitCost;
  }

  displayPackRecommendations(items):boolean
  {
    return items.length > 1;
  }

  calculateRecommendationPercentage(recommendation): string
  {
    let calc = Math.round((recommendation.currentLevel * recommendation.maxLevel) / 100);
    return `${calc}%`;
  }

  addProductToCart(items):void
  {
    items.map((item) => {
      this.totalProducts += (item.unitsInCartons * item.packSize);
      this.totalCost += (item.unitsInCartons * item.unitCost * 1);
      if(!this._itemAlreadyInCart(item))
      {
        return this._initializeFirstProductCartonOrder(item);
      } //then it is, so increment count
      this.shoppingCart.map((cartItem) => {
        (cartItem.id === item.id) ? cartItem.noOfCartons++ : '';
      });
    });
    console.log(this.shoppingCart);
  }

  removeFromCart(item): void
  {
    this.totalCost -= item.unitsInCartons * item.unitCost * item.noOfCartons;
    this.totalProducts -= (item.noOfCartons * item.unitsInCartons * item.packSize);
    this.shoppingCart.map((cartItem) => {
      if(cartItem.id === item.id)
      {
        this.shoppingCart.splice(this.shoppingCart.indexOf(cartItem), 1);
      }
    });
    console.log(this.shoppingCart);
  }

  toggleLayout(layoutType):void
  {
    this.layoutView = layoutType;
  }

  private _itemAlreadyInCart(item):boolean
  {
    if(this.shoppingCart.length === 0)
    {
      return false;
    }

    let inCart = false;
    this.shoppingCart.map((cartItem) => {
      (cartItem.id === item.id) ? inCart = true : '';
    });
    return inCart;
  }

  private _initializeFirstProductCartonOrder(item):number
  {
    item.noOfCartons = 1;
    return this.shoppingCart.push(item);
  }

}
