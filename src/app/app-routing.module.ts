import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './book-shop/content/intro/intro.component';
import { ShoppingListComponent } from './book-shop/content/shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './book-shop/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'shopping-list/:order', component: ShoppingListComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
