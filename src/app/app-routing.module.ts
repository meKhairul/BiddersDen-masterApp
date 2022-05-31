import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellComponent } from './sell/sell.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SortComponent } from './sort/sort.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductsComponent } from './products/products.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BidsComponent } from './bids/bids.component';
import { ChatComponent } from './chat/chat.component';
import { SearchComponent } from './search/search.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signin',component:SignInComponent},
  {path:'sort',component:SortComponent},
  {path:'sell',component:SellComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'signup',component:SignupComponent},
  {path:'product',component:ProductsComponent},
  {path: 'userprofile',component:UserProfileComponent},
  {path: 'bid',component:BidsComponent},
  {path:'chat',component:ChatComponent},
  {path:'search',component:SearchComponent},
  {path:'payment',component:PaymentComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
