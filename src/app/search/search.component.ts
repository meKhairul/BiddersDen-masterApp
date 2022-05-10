import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: Product[]=[];
  userdata!: any;
  searchText!:String;
  constructor(private userService:UserService,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.authenticate();
    this.products = this.productService.getSearchTextProducts();
    this.searchText = this.productService.getSearchText();
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
  showProduct(product:Product){
    this.productService.setProductToBeShown(product);
    this.router.navigate(['product']);
  }

  showBidProduct(product:Product){
    this.productService.setBidProductToBeShown(product);
    this.router.navigate(['bid']);
  }

}
