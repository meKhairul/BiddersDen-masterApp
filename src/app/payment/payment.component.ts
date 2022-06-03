import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  winningProducts!:any;
  totalAmount:number = 0;

  constructor(private userService:UserService,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getWinningProducts();
    
  }

  showProduct(product:Product)
  {
    this.productService.setProductToBeShown(product);
    this.router.navigate(['product']);
  }
  getWinningProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.winningProducts = data;
      for(let product of this.winningProducts)
      {
        this.totalAmount = this.totalAmount + product.current_price;
        console.log(product.current_price);
      }
    });
  }

}
