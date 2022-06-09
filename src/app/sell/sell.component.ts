import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  
  product = new Product();
  seller!:any;
  image:any
  uid:any
  sub_category!:any;
  img1!:any;
  img2!:any;
  userdata!:any;
  constructor(private userService : UserService, private productService: ProductService, private route:Router) { }
  authenticated :boolean = false;

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.userdata = this.userService.getUser();
      }

    );
    this.authenticate();
  }


  authenticate(){
    this.userService.authenticate().subscribe(response => {
      this.seller = response;
      this.userService.setUser(this.seller);
      
     
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }

  onChanged(event:any){
    this.image = event.target.files[0];
  }
  
  uploadata = new FormData();
  addProduct(){
    
    this.seller = this.userService.getUser();
    this.product.seller = this.seller.username;
    this.product.current_price=this.product.base_price;
    this.product.product_category = this.product.product_category +','+ this.sub_category;
    console.log(this.product);

    if(this.product.base_price==null || this.product.product_name.length==0 || this.product.product_details.length==0 || this.product.product_category.length==0 )
    {
      alert("Product is not uploaded successfully.Try Again");
    }
    else{
      this.productService.addProduct(this.product).subscribe(response=>{
        this.uid = response.toString()
        this.uploadata.append('image', this.image);
        this.uploadata.append('file_name', this.uid);
        this.uploadPhoto();
      });
    }
  }

  uploadPhoto(){
    this.productService.uploadProductImage(this.uploadata).subscribe(response=>{
      alert(response.toString())
      this.route.navigate([''])
    });
  }

}
