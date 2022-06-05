import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  winningProducts!:any;
  totalAmount:number = 0;
  user !: any;
  constructor(private userService:UserService,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.getUser();
    this.winningProducts = this.userService.getWinnerProducts();
    for(let product of this.winningProducts)
    {
      this.totalAmount += this.totalAmount + product.current_price;
    }
  }

  showProduct(product:Product)
  {
    this.productService.setProductToBeShown(product);
    this.router.navigate(['product']);
  }
  getUser()
  {
    this.userService.authenticate().subscribe(response => {
      this.user = response;
      this.userService.setUser(this.user);
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }
  
  pay(){
    this.router.navigate(['paypal'])
  }

}