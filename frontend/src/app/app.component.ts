import {Component, OnInit} from '@angular/core';

import { ProductService } from './product.service';
import { MdCard, MdMenu, MdButton } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  products: any[];
  totalProducts: number;
  totalCost: number;

  constructor (private _productService: ProductService) { }

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

}
