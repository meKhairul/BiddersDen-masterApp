import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SortComponent } from './sort/sort.component';
import { SellComponent } from './sell/sell.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { UserService } from './user.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FooterComponent } from './footer/footer.component';
import { BidsComponent } from './bids/bids.component';
import { ChatComponent } from './chat/chat.component';
import { SearchComponent } from './search/search.component';
import { PaymentComponent } from './payment/payment.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PaypalComponent } from './paypal/paypal.component';
import { CategoriesComponent } from './categories/categories.component';
import { HomePageComponent } from './home-page/home-page.component';
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
import { NgxPaypalComponent, NgxPayPalModule } from 'ngx-paypal';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FAQComponent } from './faq/faq.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SortComponent,
    NavbarComponent,
    ProductsComponent,
    SellComponent,
    SignupComponent,
    SidebarComponent,
    UserProfileComponent,
    FooterComponent,
    BidsComponent,
    ChatComponent,
    SearchComponent,
    PaymentComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    PaypalComponent,
    CategoriesComponent,
    HomePageComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    AdminUserlistComponent,
    AdminProductlistComponent,
    AdminChatComponent,
    AdminAdduserComponent,
    AdminBanuserComponent,
    AdminProductDetailsComponent,
    AdminProductUpdateComponent,
    SignInWithRecoveryCodeComponent,
    EditProfileComponent,
    FAQComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPayPalModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
