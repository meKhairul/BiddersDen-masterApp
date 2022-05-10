import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  seller = new User();
  image:any
  uid:any

  constructor(private userService : UserService, private productService: ProductService, private route:Router) { }

  ngOnInit(): void {
  
  }

  onChanged(event:any){
    this.image = event.target.files[0];
  }
  
  uploadata = new FormData();
  addProduct(){
    
    this.seller = this.userService.getUser();
    this.product.seller = this.seller.username;
    
    console.log(this.product)

    this.productService.addProduct(this.product).subscribe(response=>{
      this.uid = response.toString()
      this.uploadata.append('image', this.image);
      this.uploadata.append('file_name', this.uid);
      this.uploadPhoto()
    });
  }

  uploadPhoto(){
    this.productService.uploadProductImage(this.uploadata).subscribe(response=>{
      alert(response.toString())
      this.route.navigate([''])
    });
  }

}
