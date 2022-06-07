import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.css']
})
export class AdminProductUpdateComponent implements OnInit {

  
  seller = new User();
  image:any
  uid:any
  sub_category!:any;
  product = this.productService.getAdminUpdateProduct();
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
  updateProduct(product:Product)
  {
    console.log(product);
    var res = {
      product_id: product.uid,
      newName : product.product_name,
      new_category : product.product_category+","+this.sub_category,
      newBasePrice : product.base_price,
      newDetails : product.product_details,
      new_recieved_date : product.recieved_date,
      newShippigDate : product.shipping_date,
      new_delivered_date : product.delivered_date,
      newIsApproved :product.isApproved,
      newIsSold : product.isSold,
    }
    this.productService.updateProduct(res).subscribe(response=>{
      this.route.navigate(['../admin-productlist']);
    })
  }


}
