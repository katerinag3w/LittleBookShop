import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContentComponent } from './content/content.component';
import { IntroComponent } from './content/intro/intro.component';
import { ShoppingListComponent } from './content/shopping-list/shopping-list.component';
import { ProductListComponent } from './content/intro/product-list/product-list.component';
import { ShoppingCartComponent } from './content/intro/shopping-cart/shopping-cart.component';

import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    NavBarComponent,
    ContentComponent,
    IntroComponent,
    ShoppingListComponent,
    ProductListComponent,
    ShoppingCartComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule],
  exports: [
    NavBarComponent,
    ContentComponent,
    IntroComponent,
    ShoppingListComponent,
    ProductListComponent,
    ShoppingCartComponent,
    PageNotFoundComponent,
  ],
})
export class BookShopModule {}
