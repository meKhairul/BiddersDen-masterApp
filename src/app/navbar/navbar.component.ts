import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  constructor(private userService:UserService, private productService: ProductService, private router:Router) { }

  click = 1;
  user : User = new User();
  products : Product[] = []
  searchData!:String;
  
  /*menuButtonClickEvent() {
    if (this.click == 0) this.click = 1;
    else this.click = 0;
  }*/

  
  authenticated = false;
  
  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.user = this.userService.getUser();
      }

    );
  }

  

  logout(): void {
    this.userService.logout().subscribe(() => this.authenticated = false);
    this.user = new User();
  }

  toggle()
  {
    if(this.authenticated)
    {
      this.router.navigate(['userprofile']);
    }
    else
    {
      console.log("You must sign in first");
    }
  }
  
  search(){
    var searchText = { text : this.searchData}
    console.log(this.searchData);
    this.productService.searchProducts(searchText).subscribe(data=>{
      this.products = data;
      this.productService.setSearchTextProducts(this.products);
      this.productService.setSearchText(this.searchData);
      this.router.navigate(['search']);
      
    
      console.log(this.products)
    });
  }
  
}
