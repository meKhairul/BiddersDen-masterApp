import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {

  userdata!: any;
  products: Product[]=[];
  link:string[] = [];
  sortValue!:number;
  isdrop:number=0;

  constructor(private userService:UserService,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.authenticate();
    this.getProducts();
    this.sortValue = this.productService.getSortValue();

    this.sorting();

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
  getProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;
    });
  }

  showProduct(product:Product){
    this.productService.setProductToBeShown(product);
    this.router.navigate(['product']);
  }

  showBidProduct(product:Product){
    this.productService.setBidProductToBeShown(product);
    this.router.navigate(['bid']);
  }

  sorting()
  {
    
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;
      
      if(this.sortValue==0){
        this.products = this.products.sort((a, b) => 0-(a.current_price - b.current_price)); 
      }
      else if(this.sortValue==1)
      {
        console.log(this.sortValue);
        this.products = this.products.sort((a, b) => (a.current_price > b.current_price?1:-1));
      }
      else if(this.sortValue==2)
      {
        this.products = this.products.sort((a, b) => (a.product_name > b.product_name?1:-1));
      }
      else if(this.sortValue==3)
      {
        this.products = this.products.sort((a, b) => (a.recieved_date > b.recieved_date?1:-1));
      }
      console.log(this.products);
    });
    
      
    
    
  }
  drop()
  {
      if(this.isdrop==0)
      {
        this.isdrop=1;
      }
      else
      {
        this.isdrop=0;
      }
  }
  sortby(val : number)
  {
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;
      
      if(val==0){
        this.products = this.products.sort((a, b) => 0-(a.current_price - b.current_price)); 
      }
      else if(val==1)
      {
        console.log(val);
        this.products = this.products.sort((a, b) => (a.current_price > b.current_price?1:-1));
      }
      else if(val==2)
      {
        this.products = this.products.sort((a, b) => (a.product_name > b.product_name?1:-1));
      }
      else if(val==3)
      {
        this.products = this.products.sort((a, b) => (a.recieved_date > b.recieved_date?1:-1));
      }
      console.log(this.products);
    });
    
  }

}
