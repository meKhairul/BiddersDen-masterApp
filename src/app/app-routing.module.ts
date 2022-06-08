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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PaypalComponent } from './paypal/paypal.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';
import { AdminProductlistComponent } from './admin-productlist/admin-productlist.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { AdminAdduserComponent } from './admin-adduser/admin-adduser.component';
import { AdminBanuserComponent } from './admin-banuser/admin-banuser.component';
import { AdminProductDetailsComponent } from './admin-product-details/admin-product-details.component';
import { AdminProductUpdateComponent } from './admin-product-update/admin-product-update.component';
import { SignInWithRecoveryCodeComponent } from './sign-in-with-recovery-code/sign-in-with-recovery-code.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FAQComponent } from './faq/faq.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'signin',component:SignInComponent},
  {path:'sort',component:SortComponent},
  {path:'sell',component:SellComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'signup',component:SignupComponent},
  {path:'product',component:ProductsComponent},
  {path: 'userprofile',component:UserProfileComponent},
  {path: 'bid/:id',component:BidsComponent},
  {path:'chat',component:ChatComponent},
  {path:'search',component:SearchComponent},
  {path:'payment',component:PaymentComponent},
  
  {path:'paypal',component:PaypalComponent},
  {path:'',component:HomePageComponent},
  {path:'category',component:CategoriesComponent},
  {path:'admin-login',component:AdminLoginComponent},
  
  {path:'admin-nav',component:AdminNavbarComponent},
  {path:'admin-userlist',component:AdminUserlistComponent},
  {path:'admin-home',component:AdminProductlistComponent},
  {path:'admin-chat',component:AdminChatComponent},
  {path:'admin-adduser',component:AdminAdduserComponent},
  {path:'admin-banuser',component:AdminBanuserComponent},
  {path:'admin-productDetails/:id',component:AdminProductDetailsComponent},
  {path:'admin-updateProduct',component:AdminProductUpdateComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'signinwithcode', component:SignInWithRecoveryCodeComponent},
  {path: 'product/:id', component: ProductsComponent},
  {path: 'editProfile',component:EditProfileComponent},
  {path:'faq',component:FAQComponent},
  
  
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
