import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductService } from "./product.service";
import { LocalStorageService } from "./local-storage.service";
//import { ManageShoppingCartComponent } from './manage-shopping-cart/manage-shopping-cart.component';
import { OnlyNumber } from './shared/onlynumber.directive';

@NgModule({
  declarations: [
    AppComponent,
    OnlyNumber
//    ManageShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ProductService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
