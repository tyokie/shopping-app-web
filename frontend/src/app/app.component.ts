import {Component, OnInit} from '@angular/core';

import { ProductService } from './product.service';
import { MdCard, MdMenu, MdButton } from '@angular/material';
import { Item } from './shared/item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  products: any[];
  totalProducts: number;
  totalCost: number;

  constructor (private _productService: ProductService) {
    this.totalProducts = 0;
    this.totalCost = 0;
  }

  ngOnInit () {
    this._productService.getProductsSummary().subscribe(( products ) => {
      console.log(products);
      this.products = products;
    });
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
      this.totalCost += (item.unitsInCartons * item.packSize * item.unitCost);
      //console.log(`Total Products: ${this.totalProducts} Total Cost: ${this.totalCost}`);
    });
  }

}
