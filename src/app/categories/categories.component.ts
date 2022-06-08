import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  authenticated : boolean = false;
  userdata!: any;
  products:Product[] = [];
  category!:String;
  splitCategory:String="";
  subCategory:String="";
  hasSubCategory:boolean = false;
  isBangla :boolean = false;
  constructor(private userService:UserService, private productService : ProductService, private router : Router) { }

  ngOnInit(): void {
    this.isBangla = this.userService.getIsBangla();
    this.products = this.productService.categoricalProducts;
    this.category = this.productService.getCategory();

    for (let index = 0; index < this.category.length; index++) {
      if(this.category[index]==',')
      {
        this.hasSubCategory = true;
        continue;
      }
      if(this.hasSubCategory)
      {
        this.subCategory += this.category[index];
      }
      else
      {
        this.splitCategory += this.category[index];
      }
      
    }
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.userdata = this.userService.getUser();
      }

    );
    this.authenticate();

  }
  showProduct(product:Product){
    this.productService.setProductToBeShown(product);
    this.router.navigate(['product', product.uid]);
  }

  showBidProduct(product:Product){
    this.productService.setBidProductToBeShown(product);
    this.router.navigate(['bid']);
  } 
  getCategoricalProducts(category : String){
    var reqData = {
      category : category
    }
    this.productService.setCategory(category);
    this.productService.getCategoricalProducts(reqData).subscribe(data=>{
      this.products = data;
      console.log(this.products)
      this.productService.categoricalProducts = this.products;
      if(this.router.url == "/category"){
        console.log("we are here:" +this.router.url);
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      }
      else {
        this.router.navigate(['category']);
      }
    });
    
  }
  authenticate(){
    this.userService.authenticate().subscribe(response => {
      this.userdata = response;
      this.userService.setUser(this.userdata);
      
     
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }
}
