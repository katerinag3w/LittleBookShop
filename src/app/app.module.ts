import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookShopModule } from './book-shop/book-shop.module';

import { HttpClientModule } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeGr from '@angular/common/locales/el';

registerLocaleData(localeGr);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BookShopModule, HttpClientModule],
  providers: [{ provide: LOCALE_ID, useValue: 'el-GR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
